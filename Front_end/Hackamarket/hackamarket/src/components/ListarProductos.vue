<template>
  <div class="listed">
    <ul v-for="(miproductos, index) in miproductos" :key="miproductos.id">
        <li>
            <img :src="miproductos.imagen">
        </li>
        <li>
            NOMBRE: {{ miproductos.nombre }}
        </li>
        <li>
            STOCK: {{ miproductos.stock }}
        </li>
        <li>
            DISPONIBILIDAD: {{ miproductos.disponibilidad }}
        </li>
        <button @click="alertaCompra()">
            Comprar
        </button>
        <button @click="alertaReserva()">
            Reservar
        </button>
        <!--<button @click="enviarDatosCliente(index)">
            Editar
        </button>
        <button @click="enviarIndiceCliente(index)">
            Borrar
        </button>-->
    </ul>

  </div>
</template>

<script>
// enviarIndiceCliente
import axios from 'axios';
import Swal from 'sweetalert2'


export default {
    name:'listarproductos',
    props: {
        miproductos: Array
    },
    methods: {
        /*
        enviarDatosCliente(index){
            let datosCliente = this.misclientes[index]
            this.$emit('datos', datosCliente)
            console.log(datosCliente)
        },
        enviarIndiceCliente(index){
            let indiceCliente = this.misclientes[index].id
            console.log(datosCliente)
            this.$emit('borrar', indiceCliente)
        },*/
        alertaCompra(){
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
        }
    }
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
    transition: all .4s;
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
    height: 15rem;
    object-fit: cover;
    transition: all .4s;
    border-radius: 15px;
}
img:hover {
    cursor: pointer;
    transform: scale(1.08);
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
@media (min-width: 1500px) {
.listed {
  column-count: 2;
}
}
</style>
