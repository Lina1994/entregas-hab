<template>
  <div>

      <h1>
          FORMULARIO PARA AÑADIR NUEVO CLIENTE:
      </h1>
      <p v-show="errorMsg">
         ** Tienes campos vacíos.
      </p>
      <input type="text" v-model="nombre" placeholder="Nombre">
      <br>
      <input type="text" v-model="apellido" placeholder="Apellido">
      <br>
      <input type="text" v-model="ciudad" placeholder="Ciudad">
      <br>
      <input type="text" v-model="empresa" placeholder="Empresa">
      <br>
      <button @click="validatingData">
          Añadir cliente
      </button>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
    name: 'AddClients',
    data() {
        return {
            nombre: '',
            apellido: '',
            ciudad: '',
            empresa: '',
            creatreClient: false,
            errorMsg: false

        }
    },
    methods: {
        validatingData(){
            if(this.nombre === '' ||
            this.apellido === '' ||
            this.ciudad === '' ||
            this.empresa === ''){
                //alert('No puedes dejar campos vacíos')
                this.errorMsg = true;
                this.creatreClient = false;
                swal({
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
                apellido: self.apellido,
                ciudad: self.ciudad,
                empresa: self.empresa
            })
            .then(function(response){
              console.log(response)
            })
            .catch(function(error){
              console.log(error)
            })
            this.creatreClient = false;
            this.nombre = ''
            this.apellido = ''
            this.ciudad = ''
            this.empresa = ''
            //location.reload()
              swal("¡Good job!", "¡Cliente creado con éxito!", "success");
            } else {
                console.log('Yo no debería estar aquí.')
            } 
        }
    }
}
</script>

<style scoped>

</style>