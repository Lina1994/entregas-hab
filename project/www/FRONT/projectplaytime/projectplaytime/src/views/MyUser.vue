<template>
  <div class="home">

    <div class="internalNav">
      <button class="internalNav" @click="navProfile()">Datos</button>
      <button class="internalNav" @click="navDonate()">Donaciones</button>
      <button class="internalNav" @click="navDelivery()">Disponibilidad</button>
      <button class="internalNav" @click="navBooking()">Reservas</button>
    </div>

     <div v-show="seeModalProfile">
     <profileentrie :user="user"/>
     <button @click="startEditprofile()">
        Editar perfil
      </button>
     </div>
    <div v-show="seeModalEditUser">
    <!-- // EDITAR INFO USUARIO //-->
      <p>
        Correo electrónico:
      </p>
      <input type="text" placeholder="Correo electrónico" v-model="userEmailUpdated">
      <p> Imagen nueva: </p>
      <input type="file" @change="onFileSelectedUserImage">
      <!--<p>
        URL imagen:
      </p>
      <input type="text" placeholder="URL imagen" v-model="userimageUpdated">-->
      <p>
        Nombre:
      </p>
      <input type="text" placeholder="Nombre" v-model="userNameUpdated">
      <p>
        Apellido:
      </p>
      <input type="text" placeholder="Apellido" v-model="userSurnameUpdated">
       <p>
        Cumpleaños:
      </p>
      <input type="text" placeholder="Cumpleaños" v-model="userBirthDateUpdated">
       <p>
        Dirección:
      </p>
      <input type="text" placeholder="Dirección" v-model="userDirectionUpdated">
       <p>
        Teléfono:
      </p>
      <input type="text" placeholder="Teléfono" v-model="userPhoneUpdated">
      <p>
        ¿Guardar cambios?
      </p>
      <button @click="seeModalEditUser =! seeModalEditUser">
        Cancelar
      </button>
      <button @click="userUpdate()">
        Guardar
      </button>
    </div>
    <!-- // FIN EDITAR INFO USUARIO //-->

    <!-- // PRINTEAR INFO DONACIONES // -->
     <ul class="donated" v-show="seeModalDonate" v-for="(toy, index) in toys" :key="toy.id">
       <li :class="toy.state">
       <img :src="getImageName(toy.image)">
       <div class="donateinfo">
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
            Edad recomendada: {{toy.recomended_age}}
          </p>
          <button @click="sendUpdateIndex(index)">
            Editar
          </button>
          <button @click="deleteToyquestion(index)">
            Borrar
          </button>
       </div>
       </li>
     </ul>
     <!-- // FIN PRINTEAR INFO DONACIONES // -->

     <!-- //  PRINTEAR INFO PUNTOS ENTREGA // -->
     <div class="delivery" v-show="seeModalDelivery">
        <p>
          Puntos de entrega:
        </p>
        <ul v-for="(deliveryes, index) in deliveryes" :key="deliveryes.id">
          <li class="delivery">
            <p>
            Día: {{ formatDate(new Date(deliveryes.date)) }}
            </p>
            <p>
            Horario: {{ deliveryes.timetable }}
            </p>
            <p>
            Lugar: {{ deliveryes.place }}
            </p>
            <p>
            {{ deliveryes.comments }}
            </p>
            <button @click="sendDeliveryUpdateIndex(index)">
              Editar
            </button>
          </li>
          <button @click="createDeliPoint()">
              Nuevo punto de entrega
            </button>
        </ul>
     </div>
     
     <!-- // FIN PRINTEAR INFO PUNTOS ENTREGA // -->

     <!-- PRINTEAR INFO RESERVAS -->
     <div v-show="seeModalBooking">
        <p>
          Tus reservas:
        </p>
        <ul v-for="(bookings, index) in bookings" :key="bookings.id">
            <li>
                <p>
                  {{ bookings.toy_name_selected }}
                </p>
                <p>
                  Reserva hecha el: {{ formatDate(new Date(bookings.date)) }}
                </p>
                <p>
                  Reserva hecha para el: {{ formatDate(new Date(bookings.date_selected)) }} {{ bookings.timetable_selected }}
                </p>
                <p>
                  Código de reserva: {{ bookings.booking_code }}
                </p>
                <p>
                  Comentarios: {{ bookings.comments_selected }}
                </p>
                <p>
                  Voto: {{ bookings.vote }}
                </p>
                <p>
                  {{ voteMessage }}
                </p>
                <div v-show="voted(bookings.vote)">
                    <input type="radio" name="vote" value="0" v-model="myvote">
                    <label for="0">0</label>
                    <input type="radio" name="vote" value="1" v-model="myvote">
                    <label for="1">1</label>
                    <input type="radio" name="vote" value="2" v-model="myvote">
                    <label for="2">2</label>
                    <input type="radio" name="vote" value="3" v-model="myvote">
                    <label for="3">3</label>
                    <input type="radio" name="vote" value="4" v-model="myvote">
                    <label for="4">4</label>
                    <input type="radio" name="vote" value="5" v-model="myvote">
                    <label for="5">5</label>
                    <button @click="startVote(index)">
                      Votar
                    </button> 
                </div>
            </li>
        </ul>
     </div>

     <!-- FIN PRINTEAR INFO RESERVAS -->

     <!-- // EDITAR INFO DONACIONES // -->
     <div v-show="seeModal" class="modal">
       <p> Imagen actual: </p>
       <img :src="getImageName(selectedFile)">
       <p> Imagen nueva: </p>
       <input type="file" @change="onFileSelected">
       <!--<input type="text" placeholder="URL imagen" v-model="toyImageUpdated">-->
       <p> Nombre: </p>
       <input type="text" placeholder="Nombre" v-model="toyNameUpdated">
       <p> Categoría: </p>
       <input type="text" placeholder="Categoría" v-model="toyCategoryUpdated">
       <p> Descripción: </p>
       <input type="text" placeholder="Descripción" v-model="toyDescriptionUpdated">
       <p> Localidad: </p>
       <input type="text" placeholder="Localidad" v-model="toyLocalityUpdated">
       <p> Edad recomendada: </p>
       <input type="text" placeholder="Edad recomendada" v-model="toyRecomendedAgeUpdated">
       <p>
         ¿Guardar cambios?
       </p>
       <button @click="seeModal =! seeModal">
         Cancelar
       </button>
       <button @click="donationUpdate()">
         Guardar
       </button>
     </div>
     <!-- // FIN EDITAR INFO DONACIONES // -->

     <!-- // EDITAR INFO PUNTOS DE ENTREGA // -->
     <div v-show="seeModalEditDeliveries" class="modal">
       <p> Día: </p>
       <input type="text" placeholder="Día. Ej: 2020-08-15" v-model="deliveryDateUpdated">
       <p> Horario: </p>
       <input type="text" placeholder="Horario. Ej: De 9:00 a 11:00" v-model="deliveryTimetableUpdated">
       <p> Lugar: </p>
       <input type="text" placeholder="Lugar" v-model="deliveryPlaceUpdated">
       <p> Comentario: </p>
       <input type="text" placeholder="Comentario" v-model="deliveryCommentUpdated">
       <p>
         ¿Guardar cambios?
       </p>
       <button @click="seeModalEditDeliveries =! seeModalEditDeliveries">
         Cancelar
       </button>
       <button @click="deliveryUpdate()">
         Guardar
       </button>
     </div>
     <!-- // FIN EDITAR INFO PUNTOS DE ENTREGA // -->

     <!-- // CREAR PUNTOS DE ENTREGA // -->
     <div v-show="seeModalCreateDeliveries" class="modal">
       <p> Día: </p>
       <input type="text" placeholder="Día. Ej: 2020-08-15" v-model="deliveryDateUpdated">
       <p> Horario: </p>
       <input type="text" placeholder="Horario. Ej: De 9:00 a 11:00" v-model="deliveryTimetableUpdated">
       <p> Lugar: </p>
       <input type="text" placeholder="Lugar" v-model="deliveryPlaceUpdated">
       <p> Comentario: </p>
       <input type="text" placeholder="Comentario" v-model="deliveryCommentUpdated">
       <p>
         ¿Guardar cambios?
       </p>
       <button @click="seeModalCreateDeliveries =! seeModalCreateDeliveries">
         Cancelar
       </button>
       <button @click="validatingData()">
         Guardar
       </button>
     </div>
     <!-- // FIN CREAR PUNTOS DE ENTREGA // -->
     <myfooter class="foote"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { isUser } from '../../../../../BACKENDAPI/middlewares/isUser.js';
import profileentrie from '@/components/ProfileEntrie.vue';
import myfooter from '@/components/MyFooter.vue'
//import Swal from 'sweetalert2';



export default {
  name: 'MyUser',
  components: {
    profileentrie,
    myfooter
    },
  data(){
    return {
      toyslist: [],
      user: {},
      toys: {},
      deliveryes: {},
      bookings: {},
      authtoken: '',
      toyImageUpdated: '',
      toyNameUpdated: '',
      toyCategoryUpdated: '',
      toyDescriptionUpdated: '',
      toyLocalityUpdated: '',
      toyRecomendedAgeUpdated: '',
      idToyTuUpdate: '',
      userEmailUpdated: '',
      userimageUpdated: '',
      userNameUpdated: '',
      userSurnameUpdated: '',
      userBirthDateUpdated: '',
      userDirectionUpdated: '',
      userPhoneUpdated: '',
      iddeliveryUpdate: '',
      deliveryDateUpdated: '',
      deliveryTimetableUpdated: '',
      deliveryPlaceUpdated: '',
      deliveryCommentUpdated: '',
      seeModal: false,
      seeModalEditUser: false,
      seeModalEditDeliveries: false,
      seeModalCreateDeliveries: false,
      seeModalProfile: true,
      seeModalDonate: false,
      seeModalDelivery: false,
      seeModalBooking: false,
      voteMessage: '',
      myvote: '',
      selectedFile: null
    }
  },
  methods:{
    onFileSelectedUserImage(event){
            this.userimageUpdated = event.target.files[0]
            //console.log(this.userimageUpdated)
    },
    onFileSelected(event){
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
        },
    navProfile(){
      this.seeModalProfile = true
      this.seeModalDonate = false
      this.seeModalDelivery = false
      this.seeModalBooking = false
      this.seeModalEditUser = false
      this.seeModalEditDeliveries = false
      this.seeModalCreateDeliveries = false
      this.seeModal = false
    },
    navDonate(){
      this.seeModalProfile = false
      this.seeModalDonate = true
      this.seeModalDelivery = false
      this.seeModalBooking = false
      this.seeModalEditUser = false
      this.seeModalEditDeliveries = false
      this.seeModalCreateDeliveries = false
      this.seeModal = false
    },
    navDelivery(){
      this.seeModalProfile = false
      this.seeModalDonate = false
      this.seeModalDelivery = true
      this.seeModalBooking = false
      this.seeModalEditUser = false
      this.seeModalEditDeliveries = false
      this.seeModalCreateDeliveries = false
      this.seeModal = false
    },
    navBooking(){
      this.seeModalProfile = false
      this.seeModalDonate = false
      this.seeModalDelivery = false
      this.seeModalBooking = true
      this.seeModalEditUser = false
      this.seeModalEditDeliveries = false
      this.seeModalCreateDeliveries = false
      this.seeModal = false
    },
    startEditprofile(){
      this.userEmailUpdated = this.user.email
      //this.userimageUpdated = this.user.image
      this.userNameUpdated = this.user.user_name
      this.userSurnameUpdated = this.user.surname
      this.userBirthDateUpdated = this.user.birth_date
      this.userDirectionUpdated = this.user.direction
      this.userPhoneUpdated = this.user.phone
      console.log(this.user)
      this.seeModalEditUser = true;
    },
    async userUpdate(){
      let token = localStorage.getItem('AUTH_TOKEN_KEY');
      axios.defaults.headers.common["Authorization"] = token;
      let iduser = Number(localStorage.getItem('USER_ID'))

      let formData = new FormData();
      formData.append('image', this.userimageUpdated)
      formData.append('user_name', this.userNameUpdated)
      formData.append('surname', this.userSurnameUpdated)
      formData.append('email', this.userEmailUpdated)
      formData.append('birth_date', this.userBirthDateUpdated)
      formData.append('direction', this.userDirectionUpdated)
      formData.append('phone', this.userPhoneUpdated)
      formData.append('id', iduser)

      console.log(token)
      console.log(iduser)

      try {
        const response = await axios.put('http://localhost:3050/users/' + iduser,
        formData, { headers: { "Content-Type": "multipart/form-data" }
        /*{
          headers: {
            Authorization: authtoken
          },
          data: {
            id: iduser,
            image: this.userimageUpdated ,
            user_name: this.userNameUpdated,
            surname: this.userSurnameUpdated,
            email: this.userEmailUpdated,
            birth_date: this.userBirthDateUpdated,
            direction: this.userDirectionUpdated,
            phone: this.userPhoneUpdated
          }*/
      }) 
        setTimeout( () => {
           location.reload()
        }, 250 );
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    sendUpdateIndex(index){
      let datosToys = this.toys[index]
      console.log(datosToys.id)
      this.idToyTuUpdate = datosToys.id
      this.seeModal = true;
      this.toyImageUpdated = datosToys.image
      this.selectedFile = datosToys.image
      this.toyNameUpdated = datosToys.toy_name
      this.toyCategoryUpdated = datosToys.category
      this.toyDescriptionUpdated = datosToys.description
      this.toyLocalityUpdated = datosToys.locality
      this.toyRecomendedAgeUpdated = datosToys.recomended_age
      console.log(datosToys)
      //this.$emit('datos', datosToys)
    },
    sendDeliveryUpdateIndex(index){
      let dataDelivery = this.deliveryes[index]
      console.log(dataDelivery.id)
      this.iddeliveryUpdate = dataDelivery.id
      this.seeModalEditDeliveries = true;
      this.deliveryDateUpdated = this.formatDate(new Date(dataDelivery.date))
      this.deliveryTimetableUpdated = dataDelivery.timetable
      this.deliveryPlaceUpdated = dataDelivery.place
      this.deliveryCommentUpdated = dataDelivery.comments
      console.log(dataDelivery)
    },
    async deleteToyquestion(index){
      let datosToys = this.toys[index]
      let r = confirm("Press a button!");
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      if (r == true) {
        try {
        const response = await axios.delete('http://localhost:3050/entries/' + datosToys.id,{
            headers: {
                Authorization: authtoken
            }
        })
        setTimeout( () => {
           location.reload()
        }, 250 );
        //console.log(response)      
      } catch (error) {
        console.log(error)
      }
        console.log('Borrado id ' + datosToys.id)
      } else {
        console.log('No se ha borrado id ' + datosToys.id)
      }
    },
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
    async getMyDeliveryes(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let iduser = localStorage.getItem('USER_ID')
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
        //console.log(response.data.data)     
        this.deliveryes = response.data.data
       
      } catch (error) {
        console.log(error)
      }
    },
    async getMyBookings(){
        let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
        let iduser = localStorage.getItem('USER_ID')
                //console.log(authtoken);
        //console.log('id' + iduser)
      try {
        const response = await axios.get('http://localhost:3050/mybookings/' + iduser,{
            headers: {
                Authorization: authtoken
            },
            data: {
              id_user: iduser,
              id_user_recives: iduser
            }
        })
        //console.log(response)      
        this.bookings = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async donationUpdate(){
      let token = localStorage.getItem('AUTH_TOKEN_KEY');
      axios.defaults.headers.common["Authorization"] = token;
      let iduser = Number(localStorage.getItem('USER_ID'))
      let idauth = this.idToyTuUpdate

      let formData = new FormData();
      formData.append('image', this.selectedFile)
      formData.append('description', this.toyDescriptionUpdated)
      formData.append('locality', this.toyLocalityUpdated)
      formData.append('recomended_age', this.toyRecomendedAgeUpdated)
      formData.append('category', this.toyCategoryUpdated)
      formData.append('toy_name', this.toyNameUpdated)
      formData.append('id_user', iduser)

      console.log(idauth)
      //console.log(authtoken)
      console.log(iduser)
      try {
        const response = await axios.put('http://localhost:3050/entries/' + idauth,
        formData, { headers: { "Content-Type": "multipart/form-data" }
      }) 
        setTimeout( () => {
           location.reload()
        }, 250 );
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async deliveryUpdate(){
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      let iduser = Number(localStorage.getItem('USER_ID'))
      let idauth = this.iddeliveryUpdate
      console.log(idauth)
      console.log(authtoken)
      console.log(iduser)
      try {
        const response = await axios.put('http://localhost:3050/DeliveringPoint/' + idauth,{
          headers: {
            Authorization: authtoken
          },
          data: {
            id_user: iduser,
            date: this.deliveryDateUpdated,
            timetable: this.deliveryTimetableUpdated,
            place: this.deliveryPlaceUpdated,
            comments: this.deliveryCommentUpdated,
          }
      }) 
        setTimeout( () => {
           location.reload()
        }, 250 );
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    createDeliPoint(){
      this.seeModalCreateDeliveries = true
    },
    validatingData(){
      if(this.deliveryDateUpdated === '' ||
      this.deliveryTimetableUpdated === '' ||
      this.deliveryPlaceUpdated === '' ){
          alert('No puedes dejar campos día lugar y hora vacíos')
          this.errorMsg = true;
          this.creatreClient = false;
          /*Swal({
            title: "¡ALTO!",
            text: "Quedan campos por cubrir",
            icon: "warning",
          });*/
      }
      else {
          this.deliveryCreate()
      }
  },
    async deliveryCreate(){
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      let iduser = Number(localStorage.getItem('USER_ID'))
      console.log(authtoken);

      try {
          const response = await axios.post('http://localhost:3050/DeliveringPoint',
          {
            id_user: iduser,
            date: this.deliveryDateUpdated,
            timetable: this.deliveryTimetableUpdated,
            place: this.deliveryPlaceUpdated,
            comments: this.deliveryCommentUpdated,
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
    },
    startVote(index){
      //console.log(this.bookings[index])
      let dateSelected = this.bookings[index].date_selected;
      let idBooking = this.bookings[index].id;
    
      let dateBooking = new Date(dateSelected)
      let dateNow = new Date (Date.now())
      let dateBookingYear = dateBooking.getFullYear()
      let dateBookingMonth = dateBooking.getMonth() + 1;
      let dateBookingDay = dateBooking.getDate()
      let dateNowYear = dateNow.getFullYear()
      let dateNowMonth = dateNow.getMonth() +1;
      let dateNowDay = dateNow.getDate()
      //console.log( 'FECHA ENTREGA' + dateBookingYear + dateBookingMonth + dateBookingDay )

      if(dateBookingYear > dateNowYear){
        console.log('Ha pasado el año')
        this.voteUserDonorOfBooking(idBooking)
      }else if (dateBookingMonth > dateNowMonth){
        console.log('Ya a pasado el mes')
        this.voteUserDonorOfBooking(idBooking)
      }else if (dateBookingDay > dateNowDay){
        console.log('Ya ha pasado el día')
        this.voteUserDonorOfBooking(idBooking)
      }else {
        this.voteMessage = 'Aun no ha pasado la fecha de entrega'
        console.log('Aun no ha pasado la fecha')
      }
    },
    formatDate(current_datetime){
      return current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
    },
    async voteUserDonorOfBooking(idBooking){
      console.log('A votar!!!')
      console.log(this.myvote)
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      //let iduser = Number(localStorage.getItem('USER_ID'))
      let idauth = idBooking
      console.log(idauth)
      console.log(authtoken)
      try {
        const response = await axios.put('http://localhost:3050/myvotes/' + idauth,{
          headers: {
            Authorization: authtoken
          },
          data: {
            id: idBooking,
            vote: this.myvote,
          }
      }) 
        setTimeout( () => {
           location.reload()
        }, 250 );
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    getImageName(name){
      if(name){
        return process.env.VUE_APP_STATIC + name;
      }
    },
    state(i){
    if(i === 'sold'){
      return 'sold'
    }
    if(i === 'forsale'){
      return 'forsale'
    }
  },
    voted(i){
      if(i === null){
      return true
    } else {
      return false
    }
    }
 },
 created(){
   this.getProfile()
   this.getMyToys()
   this.getMyDeliveryes()
   this.getMyBookings()
 }
}
</script>

<style scoped>
.sold {
  background-image: url("https://www.onlygfx.com/wp-content/uploads/2017/12/sold-stamp-3.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.foote{
  position: fixed;
  bottom: -.2rem;
  width: 100%;
}
li {
  list-style-type: none;
  border: 1px solid black;
  margin-left: -2.5rem;
  border-radius: 20px;
}
img {
  max-width: 40%;
}
.internalNav{
  text-align: center;
}
button.internalNav{
  margin: 0;
  padding: 0;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid rgb(17, 16, 16);
  background-color: rgba(244, 250, 250, 0);
  /*border-radius: 15px;*/
  padding: .3rem;
  margin-right: .5rem;
  margin-right: .5rem;
  margin-bottom: .5rem;
  max-width: 100vw;
}
ul , button{
  margin-bottom: 2.5rem;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 760px) {

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {
.foote{
  position: fixed;
  bottom: -.2rem;
  width: 100%;
}
img{
  max-height: 15rem;
}
li{
  margin-left: 1rem;
  margin-right: 1rem;
  columns: 2;
}
.delivery{
  columns: 1;
}
.donateinfo{
  display: flex;
  position:relative;
  margin-right: -14rem;
  padding-top: 1rem;
  flex-direction: column;
  padding-bottom: 1rem;
}
.donateinfo button{
  width: 5rem;
  margin: .5rem;
}
ul{
  margin-bottom: 2.5rem;
}
}
</style>