<template>
  <div>
      <ul>
          <li v-for="(nota, index) in notas" :key="nota.id">
              <p>
                  ID:
                  {{ nota.id }}
              </p>
              <p>
                  Autor:
                  {{ nota.autor }}
              </p>
              <p>
                  Título:
                  {{ nota.titulo }}
              </p>
              <p>
                  Texto:
                  {{ nota.texto }}
              </p>
              <button @click="enviarIncice(index)">
                  Editar nota
              </button>
              <button @click="borrarNotaIndice(index)">
                  Eliminar nota
              </button>
              <hr>
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'TodasLasNotas',
        props:{
            notas: Array
        },
        methods: {
            enviarIncice(index){
                let datosNota = this.notas[index]
                console.log(datosNota)
                this.$emit('datos', datosNota)
            },
            borrarNotaIndice(index){
                let indice = this.notas[index].id
                //console.log(deletNota)
                this.$emit('borrar', indice /* Lo que se envía*/)
            }
        }
    }
</script>

<style scoped>

li {
    list-style-type: none;
}

</style>