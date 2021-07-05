let nodemailer = require('nodemailer');

exports.send = function (app) {

    let connection = app.config.mysql()

    let sqlQuery = 'select * from emails'

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    connection.query(sqlQuery, function (error, result) {
        let emails = error ?? result

        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Sending Emails From Portfolio',
            text: JSON.stringify(emails) + '\n alou alou'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    })

    // let deleteQuery = 'delete from emails where id > 0'

    // connection.query(deleteQuery, function (error, result) {
    //     res.send(error ? 'Erro no envio!' : 'Email enviado com sucesso');
    // })

}