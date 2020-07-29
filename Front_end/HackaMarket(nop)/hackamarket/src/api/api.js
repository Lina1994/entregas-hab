// DECLARAMOS COSAS QUE INSTALAMOS
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
/*
const swal = ('sweetalert')
const vueHeadful = ('vue-headful')
*/

// COSAS QUE USA APP
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//CONEXION A BASE DE DATOS >>>(BBDD)<<<
const connection = mysql.createConnection({
    host:'localhost',
    user:'lucia',
    password:'123456',
    database: 'hackamarket'
})

//REALIZANDO CONEXIÓN
connection.connect( error => {
    if(error) throw error
    console.log('DATABASE CONECTED')
})

//CONEXION A LA API
const PORT = 3060

app.listen(PORT, () => console.log('API UP, ¡I`m in!'))

/*
//RECOGER TODOS LOS CLIENTES DE La BBDD clientes
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

//ACTUALIZAR
app.put('/update/:id', (req, res) => {

    //DATOS QUE RECIBIMOS DE LA VISTA
    const id = req.params.id
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const ciudad = req.body.ciudad
    const empresa = req.body.empresa

    //SECUENCIA SQL
    const sql = `UPDATE lista_clientes SET nombre='${nombre}', apellido='${apellido}', ciudad='${ciudad}', empresa='${empresa}' WHERE id=${id}`

    //CONEXION A LA BBDD
    connection.query( sql, error => {
        if(error) throw error
        console.log('Cliente actualizado con éxito!')
    })

} )

//ELIMINAR CLIENTE
app.delete('/delete/:id', (req, res) =>{
    //DATOS QUE LLEGAN DE LA VISTA
    const id = req.params.id

    //SECUENCIA SQL
    const sql = `DELETE FROM lista_clientes WHERE id=${id}`

    //CONEXION A BBDD
    connection.query( sql, error => {
        if(error) throw error
        console.log('Cliente eliminado con éxito!')
    })

} )
*/