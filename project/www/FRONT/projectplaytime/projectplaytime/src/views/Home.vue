<template>
  <div class="home">
    <div class="thebody">


        <label>Buscar por: </label> 
        <input list="orderBy" v-model="myorderby"> 
        <datalist id="orderBy"> 
            <option value="Nombre" />
            <option value="Localidad" /> 
            <option value="Categoría" /> 
            <option value="Edad recomendada" /> 
        </datalist> 

<!--
      <label for="cars">Buscar por: </label>
      <select id="cars" name="cars">
        <option value="toy_name">Nombre</option>
        <option value="locality">Localidad</option>
        <option value="category">Categoría</option>
      </select>
-->
     <input type="search" placeholder="Buscar" v-model="mysearcher">
     <button @click="sendSearch()">
       Buscar
     </button>
     <toyslistentries v-on:datos="recibirJugete" :toys="toyslist"/>
    </div>
    <div class="oneToy" v-show="isselected">
       <img :src="oneImage">
       <p>
        {{oneName}}
       </p>
       <p>
         {{oneDescription}}
       </p>
       <p>
         {{oneLocality}}
       </p>
       <p>
         Edad recomendada: {{oneRecomendedAge}}
       </p>
       <p>
         {{oneCategory}}
       </p>
       <button>
         ¡Para mi!
       </button>
       <button @click="notForMe()">
         Salir
       </button>
    </div>
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
      isselected: false,
      toyslist: [],
      datatoy: {},
      oneName: '',
      oneImage: '',
      oneDescription: '',
      oneLocality: '',
      oneRecomendedAge: '',
      oneCategory: '',
      searcher: '',
      orderer: '',
      directioner: '',
      mysearcher: '',
      myorderby: ''
    }
  },
  methods:{
    sendSearch(){
      this.searcher = this.mysearcher
      if(this.myorderby === 'Nombre'){
        this.orderer = 'toy_name'
      }
      if(this.myorderby === 'Localidad'){
        this.orderer = 'locality'
      }
      if(this.myorderby === 'Categoría'){
        this.orderer = 'category'
      }
      if(this.myorderby === 'Edad recomendada'){
        this.orderer = 'recomended_age'
      }
      console.log(this.orderer)
      this.getAllToys()
    },
    async getAllToys(){
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      try {
        const response = await axios.get('http://localhost:3050/entries', {
          headers: {
            Authorization: authtoken,
            search: this.searcher,
            order: this.orderer,
            direction: this.directioner
          }
        })
        this.toyslist = response.data.data
        //console.log(response.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    notForMe(){
      this.isselected = false
    },
    recibirJugete(datosToys){
      //console.log('Desde función ' + datosToys.id)
      this.getOneToy(datosToys.id);
      this.isselected = true
    },
     async getOneToy(myid){
      try {
        const response = await axios.get('http://localhost:3050/entries/' + myid)
      .then((response) => {
        //console.log(response.data.data)
        this.datatoy = response.data.data
        this.oneName = response.data.data.toy_name
        this.oneImage = response.data.data.image
        this.oneDescription = response.data.data.description
        this.oneLocality = response.data.data.locality
        this.oneRecomendedAge = response.data.data.recomended_age
        this.oneCategory= response.data.data.category 
      })
      } catch (error) {
        console.log(error)
      }
    }
 },
 created(){
   this.getAllToys()
 }
}
</script>

<style scoped>

.oneToy {
  border: 1px solid rgba(14, 13, 13, .5);
  position:fixed;
  background: blanchedalmond;
  left: 5%;
  top: 3rem;
  padding: 1rem;
  max-width: 100vh;
  max-height: 100vh;
  width: 100%;
  /*height: 50rem;*/
  object-fit: cover;
  transition: all .4s;
}

img {
    max-width: 45%;
}

</style>