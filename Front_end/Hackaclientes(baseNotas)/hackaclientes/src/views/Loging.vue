<template>
  <div>
      <h1>
          ¿Quien eras?
      </h1>
      <input v-model="user" type="text" placeholder="Nombre de usuario">
      <br>
      <input v-model="password" type="password" placeholder="Contraseña">
      <br>
      <button class="login" @click="loginUser()">
          Loging
      </button>
      <router-link :to="{ name: 'Register'} ">¿No eres usuario?</router-link>
  </div>
</template>

<script>
import { loging } from '../api/utils'

export default {
    name: 'Loging',
    data(){
        return {
            user: '',
            password: ''
        }
    },
    methods: {
        loginUser(){
            if(this.user === '' || this.password === '') {
                alert('Te faltan datos.')
            } else {
                loging(this.user, this.password)
            }
            setTimeout( () => {
                this.$router.push('/home')
                location.reload()
            }, 500 );
        }
    }
}
</script>

<style scoped>
h1 {
    margin-top: 10rem;
}
.login:hover {
    cursor: pointer;
    transform: translate(-3px, -6px) scale(1.3) rotate(-20deg);
    background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
    background-size: 1800% 1800%;

    -webkit-animation: rainbow 18s ease infinite;
    -z-animation: rainbow 18s ease infinite;
    -o-animation: rainbow 18s ease infinite;
      animation: rainbow 18s ease infinite;
  }

@-webkit-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-moz-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@-o-keyframes rainbow {
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
@keyframes rainbow { 
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
}
</style>