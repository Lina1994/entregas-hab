<template>
  <div>
      <h1>
          Validar usuario:
      </h1>
      <p v-show="error">
          * {{ message }} *
      </p>
      <!-- <input v-model="email" type="text" required placeholder="Correo electrónico">
      <p/> -->
      <input v-model="registrationCode" type="text" required placeholder="Código de registro">
      <p/>
      <button class="validate" @click="goValidate()">
          Loging
      </button>
      <router-link :to="{ name: 'Register'} ">¿No eres usuario?</router-link>
      <myfooter class="foote"/>
  </div>
</template>

<script>
import axios from 'axios'
import myfooter from '@/components/MyFooter.vue'


export default {
    name: 'ValidateUser',
    components:{
        myfooter
    },
    data(){
        return {
            email: '',
            registrationCode: '',
            message: '',
            error: false
        }
    },
    methods: {
        async goValidate() {
            const ENDPOINT = 'http://localhost:3050'
            const registrationCode = this.registrationCode;

            if(this.registrationCode === '') {
                alert('Te faltan datos.')
                this.error = true;
                this.message = 'Faltan campos';
            } else {
                try {
                    const response = await axios.get(`${ENDPOINT}/users/validate/${registrationCode}`, {
                        //email: this.email,
                        registrationCode: this.registrationCode
                })
                .then((response) => {
                    //console.log(this.email);
                    console.log(this.registrationCode);
                    console.log('Validate OK');
                } )
                /setTimeout( () => {
                    this.$router.push('/home')
                    location.reload()
                }, 500 );

                } 
                 catch (error) {
                     //console.log(this.email, this.registrationCode)
                     console.log('Validate KO')
                     console.log(error.response.data.message);
                     //console.log(error)
                     this.error = true;
                     this.message = error.response.data.message;
                    
                }
                
            }
            
        }

    }
}
</script>

<style scoped>
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