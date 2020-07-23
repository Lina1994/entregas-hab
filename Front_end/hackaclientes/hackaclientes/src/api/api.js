// COSAS QUE HE INSTALADO
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()

//COSAS QUE USA LA APP
app.use(cors())
app.use( bodyParser.urlencoded ( {extended: true} ) )
app.use( bodyParser.json )

//DATOS DE CONEXION A LA BBDD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'lucia',
    password: '123456',
    database: 'bbdd_notas'
})

//HACIENDO CONEXION A LA BBDD
connection.connect( error => {
    if(error) throw error
    console.log('Database chachi')
} )

//PUERTO DE CONEXION DEL SERVICIO
const PORT = 3050

//CONEXION DEL SERVIDOR
app.listen( PORT, () => console.log('API CHACHI') )