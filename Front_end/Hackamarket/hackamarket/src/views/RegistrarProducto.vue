<template>
  <div>
      <naveg/>
      <div class="content">
      <h1>
          ¡Un nuevo producto!
      </h1>
      <p v-show="errorMsg">
         ** Tienes campos vacíos.
      </p>
      <input type="text" v-model="nombre" placeholder="Nombre">
      <br>
      <input type="text" v-model="stock" placeholder="Stock">
      <br>
      <input type="text" v-model="disponibilidad" placeholder="Disponibilidad">
      <br>
      <input type="text" v-model="imagen" placeholder="URL imagen">
      <br>
      <button @click="validatingData">
          Añadir producto
      </button>
      </div>
      <elfooter class="foote"/>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import naveg from '@/components/Navegador.vue'
import elfooter from '@/components/Mifooter.vue'

export default {
    name: 'AddClients',
    components: {
        naveg,
        elfooter
    },
    data() {
        return {
            nombre: '',
            stock: '',
            disponibilidad: '',
            imagen: '',
            creatreProduct: false,
            errorMsg: false

        }
    },
    methods: {
        validatingData(){
            if(this.nombre === '' ||
            this.stock === '' ||
            this.disponibilidad === '' ||
            this.imagen === ''){
                //alert('No puedes dejar campos vacíos')
                this.errorMsg = true;
                this.creatreProduct = false;
                Swal.fire({
                  title: "¡ALTO!",
                  text: "Quedan campos por cubrir",
                  icon: "warning",
                });
            }
            else {
                this.errorMsg = false;
                this.creatreProduct = true;
                this.addNewClient()
            }
        },
        addNewClient(){
            if(this.creatreProduct === true){
                var self = this;
            axios.post('http://localhost:3050/addproduct', {
                nombre: self.nombre,
                stock: self.stock,
                disponibilidad: self.disponibilidad,
                imagen: self.imagen
            })
            .then(function(response){
              console.log(response)
            })
            .catch(function(error){
              console.log(error)
            })
            this.creatreProduct = false;
            this.nombre = ''
            this.stock = ''
            this.disponibilidad = ''
            this.imagen = ''
            //location.reload()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto creado con éxito!',
                showConfirmButton: false,
                timer: 1500
            })
            } else {
                console.log('Yo no debería estar aquí.')
            } 
        }
    }
}
</script>

<style scoped>
    div {
        height: 100%;
    }
    .foote {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 90%;
        width: 100%;
        text-align: center;
    }
    .content {
        padding: 15rem;
    }
</style>