<template>
  <div class="home">
     <toyslistentries :toys="toyslist"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
// import { listEntries } from '../../../../../BACKENDAPI/controllers/toys/listEntries';
import toyslistentries from '@/components/ToysListEntries.vue';


export default {
  name: 'Home',
  components: {
    toyslistentries
    },
  data(){
    return {
      toyslist: [],
    }
  },
  methods:{
    async getAllToys(){
      try {
        const response = await axios.get('http://localhost:3050/entries')
      .then((response) => {
        this.toyslist = response.data.data
        console.log(response)
      })
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
   this.getAllToys()
 }
}
</script>