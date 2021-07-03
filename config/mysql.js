let mysql = require('mysql')

let mysqlConnection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'pedrobonfilio'
    })
}

module.exports = function () {
    return mysqlConnection;
}