var app = require('./config/server')

app.listen(process.env.port || 3000, function () {
    console.log("Servidor rodando!")
})