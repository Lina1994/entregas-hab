<template>
  <div class="home">
    <!-- 
    <vue-headful
    title="HOME"
    lang="ES"
    />
    -->
    <h1>
      Lista de clientes:
    </h1>
    <client v-on:datos="mostrarInfoCliente" v-on:borrar="borrandoCliente"
    :clientes="clientes"></client>

    <!-- MODAL PARA ACTUALIZAR CLIENTE -->

    <div v-show="seeModal" class="modal">
    <div class="modalBox">
      <H3>
        Actualiza los datos de tu cliente:
      </H3>
      <p> ID del cliente: {{ idCliente }} </p>
      <input type="text" placeholder="Nombre del cliente" v-model="nombreActualizado">
      <br>
      <input type="text" placeholder="Apellido del cliente" v-model="apellidoActualizado">
      <br>
      <input type="text" placeholder="Ciudad del cliente" v-model="ciudadActualizado">
      <br>
      <input type="text" placeholder="Empresa del cliente" v-model="empresaActualizado">
      <br>
      <button @click="actualizarCliente()">
        Actualizar cliente
      </button>
      <button @click="seeModal =! seeModal">
        Cancelar
      </button>
      
    </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import client from '@/components/ListarClientes';
import swal from 'sweetalert';
//import func from '../../vue-temp/vue-editor-bridge';

export default {
  name: 'Home',
  components: {
    client
  },
  data(){
    return {
      clientes: [],
      idCliente:'',
      nombreActualizado:'',
      apellidoActualizado:'',
      ciudadActualizado:'',
      empresaActualizado:'',
      seeModal: false
    }
  },
  methods:{
    borrandoCliente(indiceCliente){
      var self = this
      axios.delete('http://localhost:3050/delete/' + indiceCliente)
      .then(function(response){
        console.log(response)
      } )
      .catch(function(error){
        console.log(error)
      } )
      //   SWEET ALERT
      swal({
            title: "Borrado",
            text: "El cliente ha sido eliminado",
            icon: "warning",
        });
      // /SWEET ALERT
      setTimeout(function(){
        location.reload();
      }, 5000);
    },
    actualizarCliente(){
      var self = this;
      axios.put('http://localhost:3050/update/' + self.idCliente, {
        nombre: self.nombreActualizado,
        apellido: self.apellidoActualizado,
        ciudad: self.ciudadActualizado,
        empresa: self.empresaActualizado
      }) .then(function(response){
        console.log(response)
      } )
      .catch(function(error){
        console.log(error)
      })
      location.reload()
    },
    mostrarInfoCliente(datosCliente){
      this.nombreActualizado = datosCliente.nombre
      this.apellidoActualizado = datosCliente.apellido
      this.empresaActualizado = datosCliente.empresa
      this.ciudadActualizado = datosCliente.ciudad
      this.idCliente = datosCliente.id

      this.seeModal = true
    },
    // FUNCION PARA CONSEGUIR CLIENTES
    getClients(){
      var self = this;
      // LLAMADA DE AXIOS A API
      axios.get('http://localhost:3050/clientes')
      .then( function(response) {
        console.log(response)
        self.clientes = response.data
      } )
      .catch( function (error) {
        console.log( error )
      } )
    }
  },
  created(){
    this.getClients()
  }
}
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modalBox {
    background-color: #fefefe;
    margin: 2% auto;
    padding: 3rem;
    width: 80%;
    border: 1px solid #888;
  }
  button {
    border-radius: 15px;
    background: rgb(75, 80, 75);
    color:blanchedalmond;
    padding: 0.5rem;
    margin: 1.2rem;
    border: none;
    display: inline-block;
    transition: all .4s;
  }
  button:hover {
    cursor: pointer;
    transform: translateY(3px);
}
</style>
