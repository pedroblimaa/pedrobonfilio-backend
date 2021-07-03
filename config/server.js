const express = require('express')
var consign = require('consign')
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

consign().include('routes').then('config/mysql.js').into(app)

module.exports = app;