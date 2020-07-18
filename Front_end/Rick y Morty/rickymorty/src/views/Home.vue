<template>
  <div class="home">

    <vue-headful
    title="Rick y Morty | Home"
    />
    <h1>¡Rick y Morty en web!</h1>
    <button @click="swetalerton()">BUTTON TESTER</button>
    <charactercard :character="character" />
    <hr>
    <p>
      Home end, o llegaste al fin o petó la función
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
// IMPORTANDO API
import api from '@/api/api.js'
// IMPORTANDO COMPONENTES DE PERSONAJES
import charactercard from '@/components/CharacterCard.vue' 
import HelloWorld from '@/components/HelloWorld.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  components: {
     charactercard
  },
  data(){
    return{
      character:[]
    }
  },
  methods: {
    swetalerton(){
      Swal.fire({
        title: 'Titulo test',
        text: 'Texto test',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  },
  beforeCreate(){
    console.log('Before create')
  },
  created(){
    console.log('Created')
    api.getAllCharacter().then(response => (this.character = response.data.results));
  },
  beforeMount(){
    console.log('Before mount')
  },
  mounted(){
    console.log('Mounted')
  }
}
</script>
