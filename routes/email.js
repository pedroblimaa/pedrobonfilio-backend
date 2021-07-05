
let nodemailer = require('nodemailer');
let sendEmail = require('../functions/sendEmail')

function sendEmailEachXTime(app) {

    //Sending time each {timeToSend} milisseconds

    //6 seconds using for tests
    let timeToSend = 6000

    setInterval(function () {
        sendEmail.send(app)
    }, timeToSend)
}

module.exports = function (app) {

    sendEmailEachXTime(app);

    app.get('/email', function (req, res) {

        let connection = app.config.mysql()

        let sqlQuery = 'select * from emails'

        connection.query(sqlQuery, function (error, result) {
            if(error){
                res.status(400).send(error)
            } 
            
            res.status(200).send(result)
        })
    })

    app.post('/email', function (req, res) {

        let emailToSend = req.body;
        let connection = app.config.mysql()

        let sqlParams = [emailToSend['name'], emailToSend['email'], emailToSend['text']]
        let sqlQuery = 'insert into emails(name, email, description) values(?)'

        connection.query(sqlQuery, [sqlParams], function (error, result) {
            if (error) throw error
            return error ? res.status(400).send(error) : res.status(200).send('ok')
        })
    })
}