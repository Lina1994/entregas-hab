<template>
  <div class="home" @click="cancelForMe()">
    <div class="thebody">
      <div class="searcher">
            <!--<label>Buscar por: </label> -->
            <!--<input list="orderBy" v-model="myorderby"> 
            <datalist id="orderBy"> 
                <option value="Nombre" />
                <option value="Localidad" /> 
                <option value="Categoría" /> 
                <option value="Edad recomendada" /> 
            </datalist>-->
        <input type="search" placeholder="Buscar" v-model="mysearcher">
        <img :src= "getImageName('searchv2.png')" class="searchlogo" @click="sendSearch()">
        <button class="searchButton" @click="sendSearch()">
          Buscar
        </button>
        <button @click="advanceSearch = !advanceSearch" class="searchButton">
          Buequeda avanzada
        </button>
        <transition name="fade">
            <div v-if="advanceSearch" class="searchSelects">
              <div class="searchSelects">
                <input type="radio" name="vote" value="Nombre" v-model="myorderby">
                <label for="Nombre" >Nombre</label>
              </div>
              <div class="searchSelects">
                <input type="radio" name="vote" value="Localidad" v-model="myorderby">
                <label for="Localidad">Localidad</label>
              </div>
              <div class="searchSelects">
                <input type="radio" name="vote" value="Categoría" v-model="myorderby">
                <label for="Categoría">Categoría</label>              
              </div>
              <div class="searchSelects">
                <input type="radio" name="vote" value="Edad recomendada" v-model="myorderby">
                <label for="Edad recomendada">Edad recomendada</label>               
              </div>             
            </div> 
        </transition>
      </div>
     <toyslistentries v-on:datos="recibirJugete" :toys="toyslist"/>
    </div>
    <div class="oneToy" v-show="isselected">
       <!--<img :src="oneImage">-->
       <img :src= "getImageName(oneImage)">
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
       <!--<img class="avatar" :src="user.image">-->
       <img class="avatar" :src= "getImageName(user.image)">
       <p>
         {{user.user_name}}
       </p>
       <p>
         {{user.phone}}
       </p>
       <p class="votes">
         Media votos: {{votes}}
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
        <div>
          <p>
       Selecciona un unto de entrega:
          </p>
          <button class="butNotForMe" @click="notForMe()">
            Cancelar
          </button>
              <p v-show="errorMsgDelivModal">
                {{ errorMsgDeliv }}
              </p>
          <ul class="ulForMe" v-for="(delipoints, index) in delipoints" :key="delipoints.id">
            <li class="liForMe" @click="itIsForMe(index)">
              <p>
              Día: {{ formatDate(new Date(delipoints.date)) }}
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
        </div>
     <!-- // FIN PRINTEAR INFO PUNTOS ENTREGA // -->
    </div>
    <!-- /FIN ITS FOR ME! --> 
    <myfooter class="foote"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
// import { listEntries } from '../../../../../BACKENDAPI/controllers/toys/listEntries';
import toyslistentries from '@/components/ToysListEntries.vue';
import myfooter from '@/components/MyFooter.vue'


export default {
  name: 'Home',
  components: {
    toyslistentries,
    myfooter
    },
  data(){
    return {
      isselected: false,
      seeModalToMe: false,
      advanceSearch: false,
      toyslist: [],
      datatoy: {},
      user: {},
      delipoints: {},
      votes: {},
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
      myorderby: '',
      errorMsgDeliv: '',
      errorMsgDelivModal: false
    }
  },
  methods:{
    cancelForMe(){
      if(this.isselected === true || this.seeModalToMe === true ){
      }
    },
    getImageName(name){
      if(name){
        return process.env.VUE_APP_STATIC + name;
      }
    },
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
        this.getMyVotes()
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
        //console.log('id usuario donante: ' + iduser)
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
        console.log(response.data.data)
        if(response.data.data.length === 0){
          console.log('El usuario aun no ha añadido puntos de entrega.')
          this.errorMsgDeliv = 'El usuario aun no ha añadido puntos de entrega.'
          this.errorMsgDelivModal = true
        }else {
          this.errorMsgDeliv = ''
          this.errorMsgDelivModal = false
        }
        //console.log(this.delipoints)     
        this.deliveryes = response.data.data
        //console.log(this.deliveryes)
      } catch (error) {
        console.log(error)
      }
    },
    async getMyVotes(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let iduser = this.idUserOfToy
                //console.log(authtoken);
        //console.log('id' + iduser)
      try {
        const response = await axios.get('http://localhost:3050/myvotes/' + iduser,{
            headers: {
                Authorization: authtoken
            },
            data: {
              id_user: iduser
            }
        })
        this.votes = response.data.data
        //console.log(this.votes)      
      } catch (error) {
        console.log(error)
      }
    },
    willBeToMe() {
      this.seeModalToMe = true
    },
    async itIsForMe(index) {
      let deliveryPoint = this.delipoints[index].id
      //console.log(deliveryPoint)
      let userRecivedId = localStorage.getItem('USER_ID')
      //console.log(userRecivedId)
      let mymail = localStorage.getItem('EMAIL')
      //console.log(mymail)
      console.log('User recived ' + userRecivedId + ' User Donated ' + this.idUserOfToy + ', Toy ' + this.toyId + ', Delivery point id ' + deliveryPoint)
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      //console.log(authtoken)
      //console.log(this.deliveryes[index].place);

      try {
        const response = await axios.post('http://localhost:3050/bookingentries', {
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
        //console.log(response)
        alert("¡Hecho! Se ha enviado un email de confirmación.")
      })
      } catch (error) {
          console.log(error)
      }
    },
    formatDate(current_datetime){
      return current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    }
 },
 created(){
   this.getAllToys()
 }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.searchButton{
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.searchlogo{
  position: relative;
  top: .5rem;
  height: 1.6rem;
}
.searchSelects{
  display: block;
}
.butNotForMe{
  position: fixed;
  left: 6%; 
  top: 2rem;
  border-radius: 20px;
}
.ulForMe{
  margin-top: .5rem;
}
.liForMe{
  padding-top: .5rem;
}
.searcher{
  text-align: left;
  border: 1px solid rgba(14, 13, 13, .5);
  border-radius: 15px;
  padding-top: .5rem;
  padding-left: 1rem;
  margin-bottom: 1rem;
  margin-left: 3rem;
  margin-right: 3rem;
  background-color: rgb(93, 211, 250);
  box-shadow: 2px 2px 1px #aaaaaa;
}
.oneToy {
  border: 1px solid rgba(14, 13, 13, .5);
  position:fixed;
  background: rgb(250, 249, 247);
  left: 0;
  top: 0;
  padding: 1rem;
  max-width: 100vw;
  max-height: 100vh;
  width: 290px;
  /*height: 50rem;*/
  object-fit: cover;
  transition: all .4s;
  box-shadow: 10px 10px 5px #aaaaaa;
}
.toMe {
  border: 1px solid rgba(14, 13, 13, .5);
  position:fixed;
  background: rgb(250, 249, 247);
  left: 2.5%;
  top: 2%;
  padding: 1rem;
  max-width: 100vw;
  max-height: 100vh;
  width: 270px;
  /*height: 50rem;*/
  object-fit: cover;
  transition: all .4s;
  box-shadow: 10px 10px 5px #aaaaaa;
}

img {
    max-width: 45%;
    max-height: 15rem;
}
.avatar {
  max-height: 5rem;
  position:fixed;
  left: 1%;
  border-radius: 50%;
}
ul{
  list-style-type: none;
  max-width: 100%;
}
li{
  margin-left: -2rem;
  border: 1px solid black;
  border-radius: 20px;
  max-width: 100%;
}
.foote{
  position: fixed;
  bottom: -.2rem;
  width: 100%;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 760px) {
.oneToy{
  left: 2rem;
  top: 2rem;
  width: 500px;
}
.avatar {
  left: 5%;
}
.butNotForMe{
  left: 4rem; 
  top: 3rem;
}
.toMe {
  left: 2rem;
  top: 2rem;
  width: 500px;
}
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {
.oneToy{
  width: 600px;
}
.toMe {
  width: 600px;
}
.searcher{
  margin-right: 15rem;
  margin-left: 15rem;
}
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {
.oneToy{
  left: 37.5rem;
  top: 3rem;
  width: 700px;
}
.avatar {
  left: 40%;
}
.toMe {
  left: 58%;
  top: 9%;
  width: 400px;
}
.butNotForMe{
  left: 59%; 
  top: 6rem;
}
.searchSelects{
  margin-left: 10rem;
}
.searcher{
  margin-right: 42rem;
  margin-left: 42rem;
}

}
</style>