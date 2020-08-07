<template>
  <div>
      <h1>
          ¿Quien eras?
      </h1>
      <p v-show="error">
          * {{ message }} *
      </p>
      <input v-model="email" type="text" required placeholder="Correo electrónico">
      <p/>
      <input v-model="password" type="password" required placeholder="Contraseña">
      <p/>
      <button class="login" @click="goLogin()">
          Loging
      </button>
      <router-link :to="{ name: 'Register'} ">¿No eres usuario?</router-link>
  </div>
</template>

<script>
import { loginUser } from '../../../../../BACKENDAPI/controllers/users/loginUser'
import axios from 'axios'


export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            users: '',
            message: '',
            error: false
        }
    },
    methods: {
        async goLogin() {
            const ENDPOINT = 'http://localhost:3050'

            if(this.email === '' || this.password === '') {
                alert('Te faltan datos.')
                this.error = true;
                this.message = 'Faltan campos';
            } else {
                try {
                    const response = await axios.post(`${ENDPOINT}/users/login`, {
                        //.post('http://localhost:3050/users/login', {
                        email: this.email,
                        password: this.password
                })
                .then((response) => {
                    console.log(this.email);
                    console.log(this.password);
                    console.log('Loging OK');
                    //console.log(response.data.data.token);
                    let authtoken = response.data.data.token;
                    let userid = response.data.data.iduser;
                    localStorage.setItem('EMAIL', this.email)
                    localStorage.setItem('AUTH_TOKEN_KEY', authtoken)
                    localStorage.setItem('USER_ID', userid)
                    console.log('Token guardado en localstorage')
                    console.log(response)
                    console.log(userid)
                } )
                setTimeout( () => {
                    this.$router.push('/home')
                    location.reload()
                }, 250 );

                } 
                 catch (error) {
                     console.log(this.email, this.password)
                     console.log('Loging incorrecto')
                     console.log(error.response.data.message);
                     this.error = true;
                     this.message = error.response.data.message;
                    
                }
                
            }
            
        }
        /*
        async goLogin() {
            const loginUser = require("../../../../../BACKENDAPI/controllers/users/loginUser");
            if (this.email === "" || this.password === "") {
            alert("faltan datos");
            } else {
            try {
                await loginUser(this.email, this.password);

                this.$router.push("/user");
                location.reload();
                } catch (error) {
                this.error = true;
                this.message = error.response.data.message;
                }
            }
        }
        */
    }
}
</script>

<style scoped>
h1 {
    margin-top: 10rem;
}
</style>