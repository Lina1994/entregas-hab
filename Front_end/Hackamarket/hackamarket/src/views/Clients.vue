<template>
  <div class="home">
    <naveg/>
      <h1>
          Clientes!
      </h1>
      <client v-on:datos="mostrarInfoCliente" v-on:borrar="borrandoCliente"
      :misclientes="misclientes"/>
      <!-- -->
      <div v-show="seeModal" class="modal">
    <div class="modalBox">
      <H3>
        Actualiza los datos de tu cliente:
      </H3>
      <p> ID del cliente: {{ idCliente }} </p>
      <input type="text" placeholder="Nombre del cliente" v-model="nombreActualizado">
      <br>
      <input type="text" placeholder="Usuario del cliente" v-model="usuarioActualizado">
      <br>
      <input type="text" placeholder="Email del cliente" v-model="emailActualizado">
      <br>
      <input type="text" placeholder="Password del cliente" v-model="passwordActualizado">
      <br>
      <input type="text" placeholder="URL foto del cliente" v-model="fotoActualizado">
      <br>
      <button @click="actualizarCliente()">
        Actualizar cliente
      </button>
      <button @click="seeModal =! seeModal">
        Cancelar
      </button>
            
    </div>
    </div>
    <elfooter class="footered"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import naveg from '@/components/Navegador.vue'
import client from '@/components/ListarClientes';
import Swal from 'sweetalert2';
import elfooter from '@/components/Mifooter.vue'

export default {
  name: 'Clients',
  components: {
    client,
    naveg,
    elfooter
  },
  data(){
    return {
      misclientes: [],
      idCliente:'',
      nombreActualizado:'',
      usuarioActualizado:'',
      emailActualizado:'',
      passwordActualizado:'',
      fotoActualizado:'',
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
      Swal.fire({
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
        usuario: self.usuarioActualizado,
        email: self.emailActualizado,
        password: self.passwordActualizado,
        foto: self.fotoActualizado
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
      this.usuarioActualizado = datosCliente.usuario
      this.emailActualizado = datosCliente.email
      this.passwordActualizado = datosCliente.password
      this.fotoActualizado = datosCliente.foto
      this.idCliente = datosCliente.id

      this.seeModal = true
    },
    getClients(){
            var self = this;
            //LAMADA DE AXIOS A API
            axios.get('http://localhost:3050/listaclientes')
            .then( function(response){
                self.misclientes = response.data
            } )
            .catch( function(error){
                console.log(error)
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
</style>