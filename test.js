let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let shoul = chai.should();

describe('Input', () => {
    describe('/POST Calcule', () => {
        it('Testando POST válido', (done) => {
            let valido = {
                peso: 100,
                altura: 180
            }
            chai.request('http://localhost:5000')
                .post('/calcule')
                .send(valido)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
        it('Testando POST inválido (peso negativo)', (done) => {
            let invalido = {
                peso: -20,
                altura: 180
            }
            chai.request('http://localhost:5000')
                .post('/calcule')
                .send(invalido)
                .end((err, res) => {
                    res.should.have.status(302);
                    done();
                })
        })
        it('Testando POST inválido (altura negativa)', (done) => {
            let invalido = {
                peso: 80,
                altura: -30
            }
            chai.request('http://localhost:5000')
                .post('/calcule')
                .send(invalido)
                .end((err, res) => {
                    res.should.have.status(302);
                    done();
                })
        })
        it('Testando POST inválido (valores alfanumericos)', (done) => {
            let invalido = {
                peso: 'andré agassi',
                altura: 'fernando meligeni'
            }
            chai.request('http://localhost:5000')
                .post('/calcule')
                .send(invalido)
                .end((err, res) => {
                    res.should.have.status(302);
                    done();
                })
        })
    })
})
