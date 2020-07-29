<template>
  <div>
      <h1>
          ¿Quien eras?
      </h1>
      <input v-model="user" type="text" placeholder="Nombre de usuario">
      <br>
      <input v-model="password" type="password" placeholder="Contraseña">
      <br>
      <button @click="loginUser()">
          Loging
      </button>
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
                this.$router.push('/home')
            }
        }
    }
}
</script>

<style scoped>

</style>