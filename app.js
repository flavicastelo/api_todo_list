const express = require("express");
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: process.env.DBPASS,
    database:'todolist'
});

conection.connect(function(erro){
    if(erro) throw erro;
    console.log('Conectado com sucesso!');
});
const port = 3000;
app.get('/', function (req, res){
    console.log('Funcionou!');
    res.write("Deu bom");
    res.end();
});

app.listen(port);