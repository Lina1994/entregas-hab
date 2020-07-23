<template>
  <div class="home">

    <h1>
      Notas:
    </h1>

    <todaslasnotas v-on:datos="recibirNota" v-on:borrar="borrarNota" :notas="notas"/>

    <h2>
      Actualiza tu nota:
    </h2>

   
    <input type="text" v-model="nuevoTexto"
    placeholder="Tu nuevo texto">
    <button @click="actualizaNota">
      Editar la nota 
    </button>
    <br><br>

    <!--<h2>
      Eliminar nota
    </h2>
    <button @click="borrarNota">
      Eliminar la nota 
    </button> datos
    <br><br>-->
    <h2>
      Crear nota:
    </h2>
    <input v-model="titulo" type="text" placeholder="Título de la nota">
    <br>
    <input v-model="texto" type="text" placeholder="Texto de la nota" >
    <br>
    <input v-model="autor" type="text" placeholder="Autor de la nota">
    <br>
    <button @click="addNote">
      Crear nota
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import todaslasnotas from '@/components/TodasLasNotas.vue';


export default {
  name: 'Home',
  components: {
    todaslasnotas
  },
  data(){
    return {
      titulo:'',
      texto:'',
      autor:'',
      notas: [],
      nuevoTexto:'',
      notaId: null
    }
  },
  methods:{
    borrarNota(indice){
      var self = this;
      let idborrar = indice

      axios.delete('http://localhost:3050/notas/delete/'+ idborrar, {
        id: idborrar
      })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
        location.reload();
    }, 
    actualizaNota(){
      var self = this;
      axios.put('http://localhost:3050/notas/update/'+ this.notaId, {
        texto: self.nuevoTexto,
        id: self.notaId
      })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
        location.reload();
    },
    recibirNota(datosNota){
      console.log('Desde la función:' + datosNota)
      this.nuevoTexto = datosNota.texto
      this.notaId = datosNota.id
    },
    addNote(){
      var self = this;
      axios.post('http://localhost:3050/notas/add', {
        titulo: self.titulo,
        texto: self.texto,
        autor: self.autor
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
      location.reload();
    },
    getAllNotes(){
      var self = this;
      axios.get('http://localhost:3050/notas')
      .then(function(response){
        self.notas = response.data
      })
      .catch(function(error) {
        console.log(error)
    })
  }
 },
 created(){
   this.getAllNotes()
 }
}
</script>