<template>
  <div class="home">
      <h1>
          Productos!
      </h1>
      <p>
          {{ productos }}
      </p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import listarproductos from '@/components/ListarProductos';
//import swal from 'sweetalert';

export default {
  name: 'Products',
  components: {
      listarproductos
  },
  data(){
    return {
      productos: []
    }
  },
  methods:{
      
  }
}
</script>
