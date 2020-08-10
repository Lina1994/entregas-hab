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
       <hr>
       <img class="avatar" :src="user.image">
       <p>
         {{user.user_name}}
       </p>
       <p>
         {{user.phone}}
       </p>
       <button @click="willBeToMe()">
         ¡Para mi!
       </button>
       <button @click="notForMe()">
         Salir
       </button>
    <!-- ITS FOR ME! -->   
    </div>
    <div class="toMe" v-show="seeModalToMe">
      <!-- //  PRINTEAR INFO PUNTOS ENTREGA // -->
        <hr>
        <div>
          <p>
       Puntos de entrega:
          </p>
          <ul v-for="(delipoints, index) in delipoints" :key="delipoints.id">
            <li @click="itIsForMe(index)">
              <p>
              {{ delipoints.date }}
              </p>
              <p>
              {{ delipoints.timetable }}
              </p>
              <p>
              {{ delipoints.place }}
              </p>
              <p>
              {{ delipoints.comments }}
              </p>
            </li>
          </ul>
          <button @click="notForMe()">
            Cancelar
          </button>
        </div>
     <!-- // FIN PRINTEAR INFO PUNTOS ENTREGA // -->
    </div>
    <!-- /FIN ITS FOR ME! --> 
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
      seeModalToMe: false,
      toyslist: [],
      datatoy: {},
      user: {},
      delipoints: {},
      toyId: '',
      oneName: '',
      oneImage: '',
      oneDescription: '',
      oneLocality: '',
      oneRecomendedAge: '',
      oneCategory: '',
      idUserOfToy: '',
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
      //console.log(this.orderer)
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
      this.seeModalToMe = false
    },
    recibirJugete(datosToys){
      //console.log('Desde función ' + datosToys.id)
      this.getOneToy(datosToys.id);
      this.isselected = true
    },
     async getOneToy(myid){
       this.toyId = myid
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
        this.idUserOfToy = response.data.data.id_user
        this.getProfile()
        this.getMyDeliveryes()
      })
      } catch (error) {
        console.log(error)
      }
    },
    async getProfile(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let userId = this.idUserOfToy
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
    async getMyDeliveryes(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let iduser = this.idUserOfToy
                //console.log(authtoken);
        //console.log('id' + iduser)
      try {
        const response = await axios.get('http://localhost:3050/MyDeliveringPoint/' + iduser,{
            headers: {
                Authorization: authtoken
            },
            data: {
              id_user: iduser
            }
        })
        this.delipoints = response.data.data
        //console.log(this.delipoints)      
        this.deliveryes = response.data.data
        //console.log(this.deliveryes)
      } catch (error) {
        console.log(error)
      }
    },
    willBeToMe() {
      this.seeModalToMe = true
    },
    async itIsForMe(index) {
      let deliveryPoint = this.delipoints[index].id
      let userRecivedId = localStorage.getItem('USER_ID')
      let mymail = localStorage.getItem('EMAIL')
      console.log('User recived ' + userRecivedId + ' User Donated ' + this.idUserOfToy + ', Toy ' + this.toyId + ', Delivery point id' + deliveryPoint)
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      //console.log(this.deliveryes[index].place);
      try {
        const response = await axios.post('http://localhost:3050/bookingentries',{
          id_toy: this.toyId,
          id_delivery_point: deliveryPoint,
          id_user_donor: this.idUserOfToy,
          id_user_recives: userRecivedId,
          email_user_donor: this.user.email,
          email_user_recives: mymail,
          datetosend: this.deliveryes[index].date,
          timetable: this.deliveryes[index].timetable,
          place: this.deliveryes[index].place,
          comments: this.deliveryes[index].comments,
          toy_name: this.oneName,
        }, {
            headers: {
                Authorization: authtoken
            } 
      })
      .then((response)=>{
        console.log(response)
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
  left: 0;
  top: 0;
  padding: 1rem;
  max-width: 100vh;
  max-height: 100vh;
  width: 100%;
  /*height: 50rem;*/
  object-fit: cover;
  transition: all .4s;
}
.toMe {
  border: 1px solid rgba(14, 13, 13, .5);
  position:fixed;
  background: blanchedalmond;
  left: 5%;
  top: 5%;
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
    max-height: 15rem;
}
.avatar {
  max-height: 5rem;
  position:fixed;
  left: 10%;
}
li {
  list-style-type: none;
  border: 1px solid black;
}

</style>