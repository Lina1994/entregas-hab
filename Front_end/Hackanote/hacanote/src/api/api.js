// DECLARAMOS COSAS QUE INSTALAMOS
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()

// COSAS QUE USA APP
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//CONEXION A BASE DE DATOS >>>(BBDD)<<<
const connection = mysql.createConnection({
    host:'localhost',
    user:'lucia',
    password:'123456',
    database: 'bbdd_notas'
})

//REALIZANDO CONEXIÓN
connection.connect( error => {
    if(error) throw error
    console.log('DATABASE CONECTED')
})

//CONEXION A LA API
const PORT = 3050

app.listen(PORT, () => console.log('API UP, ¡I`m in!'))
/*
//ENVIANDO MENSAJE DE BIENVENIDA
//get  localhost:3050
app.get('/', (req, res) => {
    res.send('Holi')
})

//RECOGIENDO TODAS LAS NOTAS
//get  localhost:3050/notas
app.get('/notas', (req, res) => {
    res.send('Toma mis notas')
})

//RECOGIENDO NOTA ESPECIFICA
//get  localhost:3050/notas/2
app.get('/notas/:id', (req, res) => {
    res.send('Toma la nota')
})

//ACTUALIZANDO NOTA
//put  localhost:3050/notas/update/2
app.put('/notas/update/:id', (req, res) => {
    res.send('Nota actualizada')
})

//BORRAR NOTA
//delete localhost:3050/notas/delete/2
app.delete('/notas/delete/:id', (req, res) => {
    res.send('Nota eliminada')
})

//AÑADIR NUEVA NOTA
//post localhost:3050/notas/add
app.post('/notas/add', (req, res) => {
    res.send('Nota nueva')
})
*/

//AÑADIENDO UNA NOTA
app.post('/notas/add', (req, res) => {

    //SECUENCIA SQL
    const sql = 'INSERT INTO notas SET ?'

    //OBJETO QUE RECIBE LA BASE DE DATOS
    const nuevaNota = {
        texto: req.body.texto,
        titulo: req.body.titulo,
        autor: req.body.autor
    }

    //CONEXIÓN Y EJECUCIÓN DEL SQL
    connection.query(sql, nuevaNota, error => {
        if(error) throw error
        console.log('Nota creada con éxito.')
    })

    //res.send('Nota nueva')
})

//RECOGIENDO TODAS LAS NOTAS
//get  localhost:3050/notas
app.get('/notas', (req, res) => {

    //SECUENCIA SQL
    const sql = 'SELECT * FROM notas'

    //CONEXION A LA BASE DE DATOS
    connection.query(sql, (error, results) => {
        if(error) throw error
        if(results.length > 0){
            res.json(results)
        }
        else{
            console.log('No hay resultados :(')
        }
    })

   // res.send('Toma mis notas')
})

//ACTUALIZANDO NOTA
//put  localhost:3050/notas/update/2
app.put('/notas/update/:id', (req, res) => {
    
    //DATOS QUE ENVÍO A LA BASE DE DATOS
    const texto = req.body.texto
    const id = req.body.id

    //SECUENCIA SQL
    const sql = `UPDATE notas SET texto='${texto}' WHERE id='${id}'`

    //CONEXION A LA BASE DE DATOS
    connection.query(sql, error => {
        if(error) throw error
        console.log('Nota actualizada.')
    } )
    //res.send('Nota actualizada')
})

//BORRAR NOTA
//delete localhost:3050/notas/delete/2
app.delete('/notas/delete/:id', (req, res) => {

    //DATOS QUE NECESITO
    const id = req.params.id

    //SECUENCIA SQL
    const sql = `DELETE FROM notas WHERE id='${id}'`

    //CONEXION A LA BASE DE DATOS
    connection.query(sql, error => {
        if(error) throw error
        console.log('Nota eliminada.')
    } )

    //res.send('Nota eliminada')
})

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