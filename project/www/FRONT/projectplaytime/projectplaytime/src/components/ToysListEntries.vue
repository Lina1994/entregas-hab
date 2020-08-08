<template>
  <div>
      <ul>
          <li v-for="(toy, index) in toys" :key="toy.id" 
          @click="sendIndex(index)">
                  <img :src="toy.image">
              <p>
                  {{ toy.toy_name }}
              </p>
              <p>
                  Edad recomendada:
                  {{ toy.recomended_age }}
              </p>
              <p>
                  Fecha:
                  {{ toy.date }}
              </p>
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'ToysListEntries',
        props:{
            toys: Array
        },
        methods: {
            sendIndex(index){
                let datosToys = this.toys[index]
                console.log(datosToys.id)
                this.$emit('datos', datosToys)
            }
        }
    }
</script>

<style scoped>

li {
    list-style-type: none;
    border: 1px solid rgb(14, 13, 13);
    margin: 1rem;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {
li{
  margin: 3rem, 2rem;
  padding: 0;
  box-sizing: border-box;
  column-count: 1;
  column-gap: 1rem;
  float: left;
  -webkit-column-count: 2;
}
ul{
    column-count: 2;
}
li {
    padding: 1rem;
}
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {
ul {
  column-count: 3;
}
}

img {
    max-width: 40%;
}

</style>