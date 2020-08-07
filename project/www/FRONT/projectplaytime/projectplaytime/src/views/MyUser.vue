<template>
  <div class="home">
      <h1>
          Perfil
      </h1>
     <profileentrie :user="user"/>
     <mytoys v-on:datos="recibirJugete" :toys="toyslist"/>
     <ul v-for="toy in toys" :key="toy.id">
       <li>
       <img :src="toy.image">
       <p>
         {{toy.toy_name}}
       </p>
       <p>
         {{toy.category}}
       </p>
       <p>
         {{toy.description}}
       </p>
       <p>
         {{toy.locality}}
       </p>
       <p>
         {{toy.recomended_age}}
       </p>
       </li>
       <button>
         ¡Entregado!
       </button>
       <button>
         Editar
       </button>
       <button>
         Borrar
       </button>
     </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { isUser } from '../../../../../BACKENDAPI/middlewares/isUser.js';
//import { getUser } from '../../../../../BACKENDAPI/controllers/users/getUser';
import profileentrie from '@/components/ProfileEntrie.vue';
import mytoys from '@/components/MyToys.vue';


export default {
  name: 'MyUser',
  components: {
    profileentrie,
    mytoys
    },
  data(){
    return {
      toyslist: [],
      user: {},
      toys: {},
      authtoken: ''
    }
  },
  methods:{
    async getProfile(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let userId = localStorage.getItem('USER_ID')
                //console.log(authtoken);
      try {
        const response = await axios.get('http://localhost:3050/users/' + userId,{
            headers: {
                Authorization: authtoken
            }
        })
        //console.log(response)      
        this.user = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getMyToys(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let iduser = localStorage.getItem('USER_ID')
                //console.log(authtoken);
        //console.log('id' + iduser)
      try {
        const response = await axios.get('http://localhost:3050/myentries/' + iduser,{
            headers: {
                Authorization: authtoken
            },
            data: {
              id_user: iduser
            }
        })
        //console.log(response)      
        this.toys = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    recibirJugete(datosToys){
      //console.log('Desde función ' + datosToys.id)
      this.getOneToy(datosToys.id);
      this.isselected = true
    },
    donationUpdate(){
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
 },
 created(){
   this.getProfile()
   this.getMyToys()
 }
}
</script>

<style scoped>
li {
  list-style-type: none;
  border: 1px solid black;
}
img {
  max-width: 40%;
}
</style>