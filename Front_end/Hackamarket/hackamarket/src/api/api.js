// DECLARAMOS COSAS QUE INSTALAMOS
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const Swal = require('sweetalert2')

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
const PORT = 3050

app.listen(PORT, () => console.log('API UP, ¡I`m in!'))



//RECOGIENDO TODOS LOS PRODUCTOS
//get  localhost:3050/notas
app.get('/listaproductos', (req, res) => {

    //SECUENCIA SQL
    const sql = 'SELECT * FROM listaproductos'

    //CONEXION A LA BASE DE DATOS
    connection.query(sql, (error, results) => {
        if(error) throw error
        if(results.length > 0){
            res.json(results)
            console.log(results)
        }
        else{
            console.log('No hay resultados :(')
        }
    })
})
//RECOGIENDO TODOS LOS CLIENTES
//get  localhost:3050/notas
app.get('/listaclientes', (req, res) => {

    //SECUENCIA SQL
    const sql = 'SELECT * FROM listaclientes'

    //CONEXION A LA BASE DE DATOS
    connection.query(sql, (error, results) => {
        if(error) throw error
        if(results.length > 0){
            res.json(results)
            console.log(results)
        }
        else{
            console.log('No hay resultados :(')
        }
    })
})
//AÑADIR CLIENTE
app.post('/add', (req, res) => {
    //SECUENCIA SQL
    const sql = 'INSERT INTO listaclientes SET ?'

    //OBJETO DE DATOS NUEVO CLIENTE
    const nuevoCliente = {
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        foto: req.body.foto
    }

    //CONEXION A LA BBDD
    connection.query( sql, nuevoCliente, error => {
        if(error) throw error
        console.log('Cliente creado con éxito!')
    })
})
//AÑADIR PRODUCTO
app.post('/addproduct', (req, res) => {
    //SECUENCIA SQL
    const sql = 'INSERT INTO listaproductos SET ?'

    //OBJETO DE DATOS NUEVO CLIENTE
    const nuevoProducto = {
        nombre: req.body.nombre,
        stock: req.body.stock,
        disponibilidad: req.body.disponibilidad,
        imagen: req.body.imagen
    }

    //CONEXION A LA BBDD
    connection.query( sql, nuevoProducto, error => {
        if(error) throw error
        console.log('Producto creado con éxito!')
    })
})
//ACTUALIZAR CLIENTE
app.put('/update/:id', (req, res) => {

    //DATOS QUE RECIBIMOS DE LA VISTA
    const id = req.params.id
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const email = req.body.email
    const password = req.body.password
    const foto = req.body.foto

    //SECUENCIA SQL
    const sql = `UPDATE listaclientes SET nombre='${nombre}', usuario='${usuario}', email='${email}', password='${password}', foto='${foto}' WHERE id=${id}`

    //CONEXION A LA BBDD
    connection.query( sql, error => {
        if(error) throw error
        console.log('Cliente actualizado con éxito!')
    })
} )
//ACTUALIZAR PRODUCTO
app.put('/updateproduct/:id', (req, res) => {

    //DATOS QUE RECIBIMOS DE LA VISTA
    const id = req.params.id
    const nombre = req.body.nombre
    const stock = req.body.stock
    const disponibilidad = req.body.disponibilidad
    const imagen = req.body.imagen

    //SECUENCIA SQL
    const sql = `UPDATE listaproductos SET nombre='${nombre}', stock='${stock}', disponibilidad='${disponibilidad}', imagen='${imagen}' WHERE id=${id}`

    //CONEXION A LA BBDD
    connection.query( sql, error => {
        if(error) throw error
        console.log('Producto actualizado con éxito!')
    })
} )
//ELIMINAR CLIENTE
app.delete('/delete/:id', (req, res) =>{
    //DATOS QUE LLEGAN DE LA VISTA
    const id = req.params.id

    //SECUENCIA SQL
    const sql = `DELETE FROM listaclientes WHERE id=${id}`

    //CONEXION A BBDD
    connection.query( sql, error => {
        if(error) throw error
        console.log('Cliente eliminado con éxito!')
    })

} )
//ELIMINAR PRODUCTO
app.delete('/delete/product/:id', (req, res) =>{
    //DATOS QUE LLEGAN DE LA VISTA
    const id = req.params.id

    //SECUENCIA SQL
    const sql = `DELETE FROM listaproductos WHERE id=${id}`

    //CONEXION A BBDD
    connection.query( sql, error => {
        if(error) throw error
        console.log('Cliente eliminado con éxito!')
    })

} )