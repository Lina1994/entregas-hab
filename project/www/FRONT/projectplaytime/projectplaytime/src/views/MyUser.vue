<template>
  <div class="home">
      <h1>
          Perfil
      </h1>
     <profileentrie :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { isUser } from '../../../../../BACKENDAPI/middlewares/isUser.js';
import { getUser } from '../../../../../BACKENDAPI/controllers/users/getUser';
import profileentrie from '@/components/ProfileEntrie.vue';


export default {
  name: 'MyUser',
  components: {
    profileentrie
    },
  data(){
    return {
      user: {},
      authtoken: ''
    }
  },
  methods:{
    async getProfile(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
                //console.log(authtoken);
      try {
        const response = await axios.get('http://localhost:3050/users/12',{
            headers: {
                Authorization: authtoken
            }
        })
        console.log(response)      
        this.user = response.data.data
      } catch (error) {
        console.log(error)
      }
    }
    /*
    getAllToys(){
      var self = this;
      axios.get('http://localhost:3050/entries')
      .then(function(response){
        self.toyslist = response.data.data
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
    }) 
    }
    */
    
 },
 created(){
   this.getProfile()
 }
}
</script>