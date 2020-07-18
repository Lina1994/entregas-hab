<!-- HTML DEL COMPONENTE -->
<template>
  <div class="topartist">
      <input type="search" v-model="search" placeholder="Busca por nombre">
      <div class="listed">
    <ul v-for="item in filtered" :key="item.id">
      <li class="imagen">
        <img :src="item.image[2]['#text']">
      </li>
      <li>
        {{ item.name }}
      </li>
      <li>
        {{ item.listeners }} listeners
      </li>
    </ul>
      </div>
  </div>
</template>
<!-- /HTML DEL COMPONENTE -->

<script>//JS DEL COMPONENTE

export default {
  name: 'TopArtistComp',
  //DATA PARA EL BUSCADOR
  data() {
      return{
          search:''
      }
  },
  props:{
      artists: Array
  },
  // CREO UN BUSCADOR POR NAME
  computed: {
        filtered(){
            if(!this.search){
                return this.artists;
            }
            return this.artists.filter( item => 
                item.name.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    }
}
</script>

<style scoped>
* {
    text-align: center;
}
ul{
    counter-reset: li;
    list-style: none;
    font: 15px 'trebuchet MS', 'lucida sans';
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
    position: relative;
    display: block;
    padding: .4em .4em .4em 2em;
    margin: 3rem 0;
    background: #ddd;
    color: #444;
    border-radius: .3em;
    transition: all .3s ease-out;
}
li.imagen{
    position: absolute;
    left: -1.3rem;
    margin-top: -.9rem;
    background:ivory;
    height: 4rem;
    width: 3rem;
    line-height: 2rem;
    border: .3em solid #fff;
    text-align: center;
    font-weight: bold;
    border-radius: 50%;
    transition: all .3s ease-out;
}
img{
  width: 100%;
  border-radius: 50%;
}
input {
    margin-top: 1rem;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {
ul{
  margin: .7rem;
  padding: .8rem;
}
li.imagen{
    background-color: ivory;
}
.listed {
  border-color: ivory;
  margin: 1rem;
  padding: 0;
  box-sizing: border-box;
  column-count: 2;
  column-gap: 5rem;
}
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1500px) {
.listed {
  column-count: 5;
}
}
</style>
