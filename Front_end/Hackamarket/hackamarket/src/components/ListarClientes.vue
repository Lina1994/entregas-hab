<template>
  <div class="listed">
    <ul v-for="(misclientes, index) in misclientes" :key="misclientes.id">
        <li>
            <img :src="misclientes.foto">
        </li>
        <li>
            NOMBRE: {{ misclientes.nombre }}
        </li>
        <li>
            USUARIO: {{ misclientes.usuario }}
        </li>
        <li>
            EMAIL: {{ misclientes.email }}
        </li>
        <li>
            PASSWORD: {{ misclientes.password }}
        </li>
        <button @click="enviarDatosCliente(index)">
            Editar
        </button>
        <button @click="enviarIndiceCliente(index)">
            Borrar
        </button>
    </ul>

  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'


export default {
    name:'listarclientes',
    props: {
        misclientes: Array
    },
    methods: {
        enviarDatosCliente(index){
            let datosCliente = this.misclientes[index]
            this.$emit('datos', datosCliente)
            console.log(datosCliente)
        },
        enviarIndiceCliente(index){
            let indiceCliente = this.misclientes[index].id
            this.$emit('borrar', indiceCliente)
        },
        /*alertaCompra(){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Compra realizada.',
                showConfirmButton: false,
                timer: 1500
            })
        },
        alertaReserva(){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Reserva realizada.',
                showConfirmButton: false,
                timer: 1500
            })
        },*/
        
    },
    
}
</script>

<style scoped>

ul {
    list-style: none;
    border: 1px solid black;
    border-radius: 20px;
    width: 70%;
    margin: 2% auto;
    background: rgb(228, 234, 238);
    padding: 0;
    transition: all 1s;
    box-shadow: 5px 5px rgba(10, 10, 10, 0.3);
}
li {
    padding: 0;
    margin: 1rem;
    border-bottom: 1px solid black;
}
button {
    width: 35%;
    border-radius: 15px;
    background: rgb(75, 35, 73);
    color:blanchedalmond;
    padding: 0.5rem;
    margin: 1.2rem;
    border: none;
    display: inline-block;
    transition: all .4s;
  }
button:hover {
    cursor: pointer;
    transform: translate(3px, 6px);
}
img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    transition: all .4s;
    border-radius: 15px;
}
img:hover {
    position: relative;
    cursor: pointer;
    transform: scale(1.08);
    height: 100%;
}
* {
    text-align: center;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {
ul{
  margin: 3rem, 2rem;
  padding: 0;
  box-sizing: border-box;
  column-count: 2;
  column-gap: 5rem;
}
li {
    padding: 1rem;
    border-bottom: 0px solid black;
}
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {
.listed {
  column-count: 2;
}
}

</style>