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
    user: 'root',
    password: 'password',
    database: 'hackaclient'
})

//HACIENDO CONEXION A LA BBDD
connection.connect( error => {
    if(error) throw error
    console.log('Database chachi')
} )

//PUERTO DE CONEXION DEL SERVICIO
const PORT = 3010

//CONEXION DEL SERVIDOR
app.listen( PORT, () => console.log('API CHACHI') )

//////   CRUD    ////////////////////////////////////////////////////

//RECOGER TODOS LOS CLIENTES DE La BBDD
app.get('/clientes', (req, res)=> {

    // SECUENCIA SQL
    const sql = 'SELECT * FROM lista_clientes'

    //CONEXION A LA BBDD
    connection.query( sql, (error,results) => {
        if(error) throw error
        if(results.length > 0) {
            res.json(results)
        } else {
            console.log('NO HAY CLIENTES :(')
        }
    } )

} )

//AÑADIR
app.post('/add', (req, res) => {
    //SECUENCIA SQL
    const sql = 'INSERT INTO lista_clientes SET ?'

    //OBJETO DE DATOS NUEVO CLIENTE
    const nuevoCliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        ciudad: req.body.ciudad,
        empresa: req.body.empresa
    }

    //CONEXION A LA BBDD
    connection.query( sql, nuevoCliente, error => {
        if(error) throw error
        console.log('Cliente creado con éxito!')
    })
})