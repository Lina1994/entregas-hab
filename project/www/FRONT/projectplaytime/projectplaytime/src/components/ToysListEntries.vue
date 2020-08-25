<template>
  <div>
      <ul>
          <li v-show="state(toy.state)" v-for="(toy, index) in toys" :key="toy.id" 
          @click="sendIndex(index)">
              <!--<img :src="toy.image">-->
              <img :src= "getImageName(toy.image)">
              <div class="description">
                    <p>
                        {{ toy.toy_name }}
                    </p>
                    <p>
                        Edad recomendada:
                        {{ toy.recomended_age }}
                    </p>
                    <p>
                        Categoría:
                        {{ toy.category }}
                    </p>
                    <p>
                        Localidad:
                        {{ toy.locality }}
                    </p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import { isLoggedIn } from '../utils/utils.js'
    export default {
        name: 'ToysListEntries',
        data(){
            return{
                sold: false,
                forsale: true
            }
        },
        props:{
            toys: Array
        },
        methods: {
            state(i){
                if(i === 'sold'){
                    return false
                }
                if(i === 'forsale'){
                    return true
                }
            },
            sendIndex(index){
                if(isLoggedIn()){
                    let datosToys = this.toys[index]
                    console.log(datosToys.id)
                    this.$emit('datos', datosToys)
                } else {
                    alert('Tienes que registrarte para acceder aquí.')
                    console.log('No estas logueado')
                }
            },
            getImageName(name){
                if(name){
                    return process.env.VUE_APP_STATIC + name;
                }
            }
        }
    }
</script>

<style scoped>

li {
    list-style-type: none;
    border: 1px solid rgba(80, 66, 66, 0.849);
    margin-top: -.07rem;
    margin-bottom: 1rem;
    margin-left: 1%;
    border-radius: 20px;
    max-width: 87%;
    break-inside: avoid; 
    break-after: avoid;
    box-shadow: 2px 2px 2px #aaaaaa;
}
ul{
    margin-bottom: 3rem;
    max-width: 100%;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 760px) {
    li{
        width: 47rem;
        height: 20rem;
        margin-left: 2.5rem;
    }
    li img {
        display: flex;
        position:relative;
        margin-left: 1rem;
        margin-top: 1rem;
        height: 17rem;
        width: 23rem;
        object-fit: contain;
        
    }
    li p{
        text-align: start;
        display: flex;
        position:relative;
        margin-left: 20rem;
        padding-top: 1rem;
        flex-direction: column;
        padding-bottom: 1rem;
    }
    li .description{
        margin-top: -17rem;
    }
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {
li p{
    margin-left: 15rem;
    padding-bottom: 1rem;
}

ul{
    column-count: 2;
    column-gap: 0px;
}

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1400px) {
    li p{
        margin-left: 16.7rem;
    }
}

/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {
ul {
  column-count: 3;
}
li p{
        margin-left: 15rem;
    }
}

img {
    max-width: 40%;
}

</style>