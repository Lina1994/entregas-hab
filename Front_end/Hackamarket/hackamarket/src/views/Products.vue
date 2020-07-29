<template>
  <div class="home">
    <naveg/>
      <h1>
          Productos!!!
      </h1>
      <listarproductos :miproductos="miproductos"/>
      <!--<div v-show="seeModal" class="modal">
      <div class="modalBox">
      <H3>
        Actualiza los datos de tu cliente:
      </H3>
      <p> ID del cliente: {{ idCliente }} </p>
      <input type="text" placeholder="Nombre del cliente" v-model="nombreActualizado">
      <br>
      <input type="text" placeholder="Stock del cliente" v-model="stockActualizado">
      <br>
      <input type="text" placeholder="Disponibilidad del cliente" v-model="disponibilidadActualizado">
      <br>
      <input type="text" placeholder="URL foto del producto" v-model="imagenActualizado">
      <br>
      <button @click="actualizarCliente()">
        Actualizar cliente
      </button>
      <button @click="seeModal =! seeModal">
        Cancelar
      </button>     
    </div>

      </div>-->
      <elfooter/>
  </div>
</template>

<script>
// @ is an alias to /src 
import axios from 'axios';
import listarproductos from '@/components/ListarProductos.vue';
import naveg from '@/components/Navegador.vue'
import elfooter from '@/components/Mifooter.vue'
//import Swal from 'sweetalert2';

export default {
  name: 'Products',
  components: {
      listarproductos,
      naveg,
      elfooter
  },
  data(){
    return {
      miproductos: []/*,
      idCliente:'',
      nombreActualizado:'',
      stockActualizado:'',
      disponibilidadActualizado:'',
      imagenActualizado:'',
      seeModal: false*/
    }
  },
  methods:{ 
/*
     borrandoCliente(indiceCliente){
      var self = this
      axios.delete('http://localhost:3050/delete/product/' + indiceCliente)
      .then(function(response){
        console.log(response)
      } )
      .catch(function(error){
        console.log(error)
      } )
      //   SWEET ALERT
      Swal.fire({
            title: "Borrado",
            text: "El producto ha sido eliminado",
            icon: "warning",
        });
      // /SWEET ALERT
      setTimeout(function(){
        location.reload();
      }, 5000);
    },
    actualizarCliente(){
      var self = this;
      axios.put('http://localhost:3050/updateproduct/' + self.idCliente, {
        nombre: self.nombreActualizado,
        stock: self.stockActualizado,
        disponibilidad: self.disponibilidadActualizado,
        imagen: self.imagenActualizado
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
      this.stockActualizado = datosCliente.stock
      this.disponibilidadActualizado = datosCliente.disponibilidad
      this.imagenActualizado = datosCliente.imagen
      this.idCliente = datosCliente.id

      this.seeModal = true
    },*/
    getProducts(){
      var self = this;
      //LAMADA DE AXIOS A API
      axios.get('http://localhost:3050/listaproductos')
      .then( function(response){
          self.miproductos = response.data
      } )
      .catch( function(error){
          console.log(error)
      } )
    }
  },
  created(){
    console.log('holi')
    this.getProducts()
  } 
}
</script>

<style scoped>

</style>