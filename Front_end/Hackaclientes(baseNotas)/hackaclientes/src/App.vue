<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home'} ">Home</router-link> |
      <router-link :to="{ name: 'AddClients'} ">Formulario</router-link> |
      <router-link :to="{ name: 'About'} ">About</router-link> |
      <router-link :to="{ name: 'Register'} ">Register</router-link> |
      <router-link :to="{ name: 'Loging'} ">Loging</router-link> 
      <button @click="logoutUser()">
        LOGOUT
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { logout } from './api/utils'

export default {
  methods: {
    logoutUser(){
      logout()
      this.$router.push('/')
    } 
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
button {
    border-radius: 15px;
    background: rgb(75, 35, 73);
    color:blanchedalmond;
    padding: 0.5rem;
    margin: 1.2rem;
    border: none;
    display: inline-block;
    transition: all .5s;
  }
button:hover {
    cursor: pointer;
    transform: translate(-3px, -6px) scale(0.8) rotate(20deg) skew(5deg);
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
