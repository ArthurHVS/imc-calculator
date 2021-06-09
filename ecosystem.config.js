module.exports = {
    apps: [{
        name: "imc-calculator",
        script: "./app.js",
        env: {
            "PORT": 5000, 
            NODE_ENV: "development"
        },
        env_production: {
            "PORT": 3000,
            NODE_ENV: "production"
        }
    }]
}