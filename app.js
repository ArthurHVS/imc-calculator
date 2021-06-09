const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const alert = require('alert');
const path = require('path');
var app = express();

app.use(express.static('./'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    res.status(200).end();
});

app.post('/calcule', [
    check('peso').isFloat().withMessage('Não insira valores não-numéricos').custom(
        peso => {
            if (peso < 0) {
                throw new Error('Seu peso não pode ser negativo')
            }
            else {
                return true;
            }
        }),
    check('altura').isFloat().withMessage('Não insira valores não-numéricos').custom(
        altura => {
            if (altura < 0) {
                throw new Error('Sua altura não pode ser negativa')
            }
            else if (altura > 225) {
                throw new Error('Você realmente tem mais de 2.25m?')
            }
            else {
                return true;
            }
        })
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var myerror = errors.array()
        myerror.forEach(error => {
            alert(error.msg)
        });
        res.status(302).sendFile(path.join(__dirname + '/index.html'));
    }
    else {
        var imc = req.body.peso / ((req.body.altura / 100) * (req.body.altura / 100))
        if (imc > 40) {
            alert("Você está com obesidade grau III, segundo a OMS \nIMC: " + imc);
            return res.status(200).redirect('/');
        }
        else if (imc > 35) {
            alert("Você está com obesidade grau II, segundo a OMS \nIMC: " + imc);
            return res.status(200).redirect('/');
        }
        else if (imc > 30) {
            alert("Você está com obesidade grau I, segundo a OMS \nIMC: " + imc);
            return res.status(200).redirect('/');
        }
        else if (imc > 25) {
            alert("Você está com sobrepeso, segundo a OMS \nIMC: " + imc);
            return res.status(200).redirect('/');
        }
        else if (imc > 18.5) {
            alert("Você está no peso ideal, segundo a OMS \nIMC: " + imc);
            return res.redirect('/');
        }
        else {
            alert("Você está abaixo do peso ideal, segundo a OMS \nIMC: " + imc);
            return res.redirect('/');
        }
    }
})

app.listen(process.env.PORT);
mydate = new Date().toLocaleString('pt-br');
if (process.env.NODE_ENV == "production") {
    console.log("Production time, baby! \n" + mydate + "\n" + "Estamos ouvindo na porta " + process.env.PORT)
} else {
    console.log('Sempre a nos desenvolver... \n' + mydate + "\n" + "Estamos ouvindo na porta " + process.env.PORT)
}