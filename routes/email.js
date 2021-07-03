
let nodemailer = require('nodemailer');

function sendEmail(app) {

    let connection = app.config.mysql()

    let sqlQuery = 'select * from emails'

    let emails;

    connection.query(sqlQuery, function (error, result) {
        emails =  error ?? result
    })

    console.log(emails)

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'pedroblimaa@gmail.com',
    //         pass: 'anxybsvgzlqmeixa'
    //     }
    // })

    // var mailOptions = {
    //     from: 'pedroblimaa@gmail.com',
    //     to: 'pedroblimaa@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    // }

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })
}

function sendEmailEachXTime(app) {

    let timeToSend = 10000

    setInterval(function () {
        sendEmail(app);
    }, timeToSend)
}

module.exports = function (app) {

    sendEmailEachXTime(app);

    app.get('/email', function (req, res) {

        let connection = app.config.mysql()

        let sqlQuery = 'select * from emails'

        connection.query(sqlQuery, function (error, result) {
            res.status(200).send(error ?? result)
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