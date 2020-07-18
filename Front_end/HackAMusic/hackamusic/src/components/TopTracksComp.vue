<!-- HTML DEL COMPONENTE -->
<template>
  <div class="toptracks">
       <input type="search" v-model="search" placeholder="Busca por nombre">
       <div class="listed">
    <ul v-for="item in filtered" :key="item.id">
      <li class="imagen">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7Wv4i0-4Ux7fa_icURdaIxp00dcI2C4ePRg&usqp=CAU">
      </li>
      <li>
        {{ item.name }}
      </li>
      <li>
        Duration: {{ item.duration }}s
      </li>
      <li>
        {{ item.listeners }} listeners
      </li>
    </ul> 
       </div>
  </div>
</template>
<!-- /HTML DEL COMPONENTE -->

<script> //JS DEL COMPONENTE

export default {
  name: 'Toptracks',
  //DATA PARA EL BUSCADOR
  data() {
      return{
          search:''
      }
  },
  props: {
      tracks: Array
  },
  // CREO UN BUSCADOR POR NAME
  computed: {
        filtered(){
            if(!this.search){
                return this.tracks;
            }
            return this.tracks.filter( item => 
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
    left: -1.3em;
    margin-top: -1em;
    background: #87ceeb;
    height: 4rem;
    width: 4.5rem;
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
    margin-top: 5rem;
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
