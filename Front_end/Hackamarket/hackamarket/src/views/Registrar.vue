<template>
  <div>
      <naveg/>
      <div class="content">
      <h1>
          ¡BIENVENID@ A LA FAMILIA!
      </h1>
      <p v-show="errorMsg">
         ** Tienes campos vacíos.
      </p>
      <input type="text" v-model="nombre" placeholder="Nombre">
      <br>
      <input type="text" v-model="usuario" placeholder="Usuario">
      <br>
      <input type="text" v-model="email" placeholder="email">
      <br>
      <input type="text" v-model="password" placeholder="Password">
      <br>
      <input type="text" v-model="foto" placeholder="URL foto">
      <br>
      <button @click="validatingData">
          Añadir cliente
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
            usuario: '',
            email: '',
            password: '',
            foto: '',
            creatreClient: false,
            errorMsg: false

        }
    },
    methods: {
        validatingData(){
            if(this.nombre === '' ||
            this.usuario === '' ||
            this.email === '' ||
            this.password === '' ||
            this.foto === ''){
                //alert('No puedes dejar campos vacíos')
                this.errorMsg = true;
                this.creatreClient = false;
                Swal.fire({
                  title: "¡ALTO!",
                  text: "Quedan campos por cubrir",
                  icon: "warning",
                });
            }
            else {
                this.errorMsg = false;
                this.creatreClient = true;
                this.addNewClient()
            }
        },
        addNewClient(){
            if(this.creatreClient === true){
                var self = this;
            axios.post('http://localhost:3050/add', {
                nombre: self.nombre,
                usuario: self.usuario,
                email: self.email,
                password: self.password,
                foto: self.foto
            })
            .then(function(response){
              console.log(response)
            })
            .catch(function(error){
              console.log(error)
            })
            this.creatreClient = false;
            this.nombre = ''
            this.usuario = ''
            this.email = ''
            this.password = ''
            this.foto = ''
            //location.reload()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Cliente creado con éxito!',
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