<template>
  <div class="home">
    <h1>
      Lista de clientes:
    </h1>
    <p>
      {{ clientes }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      clientes: []
    }
  },
  methods:{
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
