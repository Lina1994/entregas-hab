<template>
  <div>
      <h1>
          ¡Bienvenid@ a la familia!
      </h1>
      <p v-show="error">
          * {{ message }} *
      </p>
      <p v-show="validateMessage">
          Se te ha enviado un mail de confirmación a tu correo, pincha en el enlace para activar tu cuenat
      </p>
      <input type="text" v-model="user_name" placeholder="Nombre de usuario">
      <p/>
      <input type="text" v-model="surname" placeholder="Apellido">
      <p/>
      <input type="text" v-model="direction" placeholder="Dirección">
      <p/>
      <input type="text" v-model="email" placeholder="Email">
      <p/>
      <input type="password" v-model="password" placeholder="Contraseña">
      <p/>
      <button class="register" @click="goRegister()">
          Registrarse
      </button>
      <p/>
      <router-link :to="{ name: 'Login'} ">¿Ya eres parte de la familia?</router-link> 
      <p/>
      <router-link :to="{ name: 'Validate'} ">¿Aun no validaste tu cuenta?</router-link>
      <myfooter class="foote"/> 
  </div>
</template>

<script>
import axios from 'axios'
import myfooter from '@/components/MyFooter.vue'

export default {
    name: 'Register',
    components:{
        myfooter
    },
    data(){
        return {
            user_name:'',
            surname:'',
            direction: '',
            email: '',
            password: '',
            users: '',
            message: '',
            error: false,
            validateMessage: false
        }
    },
    methods: {
        async goRegister() {
            const ENDPOINT = 'http://localhost:3050'

            if(this.email === '' || this.password === '') {
                alert('Te faltan datos.')
                this.error = true;
                this.message = 'Faltan campos';
            } else {
                try {
                    const response = await axios.post(`${ENDPOINT}/users/`, {
                    email: this.email,
                    password: this.password,
                    user_name: this.user_name,
                    surname: this.surname,
                    direction: this.direction
                })
                .then((response) => {
                    console.log(this.email);
                    console.log(this.password);
                    console.log(this.user_name);
                    console.log(this.surname);
                    console.log(this.direction);
                    console.log('Register OK');
                } )
                this.validateMessage = true
                /*setTimeout( () => {
                    this.$router.push('/home')
                    location.reload()
                }, 500 );*/
                } 
                 catch (error) {
                     //console.log(this.email, this.password)
                     console.log('Registro incorrecto')
                     console.log(error.response.data.message);
                     this.error = true;
                     this.message = error.response.data.message;
                    
                }
                
            }
            
        }
    }
}
</script>

<style scopede>
h1 {
    margin-top: 10rem;
}
.foote{
  position: fixed;
  bottom: -.2rem;
  width: 100%;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 760px) {

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {

}
</style>