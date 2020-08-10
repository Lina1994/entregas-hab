<template>
  <div class="home">

     <profileentrie :user="user"/>
     <button @click="startEditprofile()">
        Editar perfil
    </button>
    <!-- // EDITAR INFO USUARIO //-->
    <div v-show="seeModalEditUser">
      <p>
        Correo electrónico:
      </p>
      <input type="text" placeholder="Correo electrónico" v-model="userEmailUpdated">
      <p>
        URL imagen:
      </p>
      <input type="text" placeholder="URL imagen" v-model="userimageUpdated">
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
     <ul v-for="(toy, index) in toys" :key="toy.id">
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
         Edad recomendada: {{toy.recomended_age}}
       </p>
       </li>
       <button>
         ¡Entregado!
       </button>
       <button @click="sendUpdateIndex(index)">
         Editar
       </button>
       <button @click="deleteToyquestion(index)">
         Borrar
       </button>
     </ul>
     <!-- // FIN PRINTEAR INFO DONACIONES // -->

     <!-- //  PRINTEAR INFO PUNTOS ENTREGA // -->
     <p>
       Puntos de entrega:
     </p>
     <ul v-for="(deliveryes, index) in deliveryes" :key="deliveryes.id">
       <li>
         <p>
         {{ deliveryes.date }}
         </p>
         <p>
         {{ deliveryes.timetable }}
         </p>
         <p>
         {{ deliveryes.place }}
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
     
     <!-- // FIN PRINTEAR INFO PUNTOS ENTREGA // -->

     <!-- // EDITAR INFO DONACIONES // -->
     <div v-show="seeModal" class="modal">
       <p> URL imagen: </p>
       <input type="text" placeholder="URL imagen" v-model="toyImageUpdated">
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
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { isUser } from '../../../../../BACKENDAPI/middlewares/isUser.js';
import profileentrie from '@/components/ProfileEntrie.vue';
//import Swal from 'sweetalert2';



export default {
  name: 'MyUser',
  components: {
    profileentrie
    },
  data(){
    return {
      toyslist: [],
      user: {},
      toys: {},
      deliveryes: {},
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
      seeModalCreateDeliveries: false
    }
  },
  methods:{
    startEditprofile(){
      this.userEmailUpdated = this.user.email
      this.userimageUpdated = this.user.image
      this.userNameUpdated = this.user.user_name
      this.userSurnameUpdated = this.user.surname
      this.userBirthDateUpdated = this.user.birth_date
      this.userDirectionUpdated = this.user.direction
      this.userPhoneUpdated = this.user.phone
      console.log(this.user)
      this.seeModalEditUser = true;
    },
    async userUpdate(){
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      let iduser = Number(localStorage.getItem('USER_ID'))
      console.log(authtoken)
      console.log(iduser)
      try {
        const response = await axios.put('http://localhost:3050/users/' + iduser,{
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
    sendUpdateIndex(index){
      let datosToys = this.toys[index]
      console.log(datosToys.id)
      this.idToyTuUpdate = datosToys.id
      this.seeModal = true;
      this.toyImageUpdated = datosToys.image
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
      this.deliveryDateUpdated = dataDelivery.date
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
        //console.log(response)      
        this.deliveryes = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async donationUpdate(){
      let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
      let iduser = Number(localStorage.getItem('USER_ID'))
      let idauth = this.idToyTuUpdate
      console.log(idauth)
      console.log(authtoken)
      console.log(iduser)
      try {
        const response = await axios.put('http://localhost:3050/entries/' + idauth,{
          headers: {
            Authorization: authtoken
          },
          data: {
            id_user: iduser,
            image: this.toyImageUpdated,
            toy_name: this.toyNameUpdated,
            category: this.toyCategoryUpdated,
            description: this.toyDescriptionUpdated,
            locality: this.toyLocalityUpdated,
            recomended_age: this.toyRecomendedAgeUpdated
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
    }
 },
 created(){
   this.getProfile()
   this.getMyToys()
   this.getMyDeliveryes()
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