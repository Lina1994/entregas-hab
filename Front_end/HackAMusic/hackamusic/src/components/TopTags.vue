<!-- HTML DEL COMPONENTE -->
<template>
  <div class="home">
      <input type="search" v-model="search" placeholder="Busca por nombre del estilo">
      <div class="listed">
    <ul v-for="item in filtered" :key="item.id">
      <li class="imagen">
        <img src="https://www.newstatesman.com/sites/default/files/styles/cropped_article_image/public/blogs_2016/03/hashtag.png?itok=FZC97RIr">
      </li>
      <li>
         {{ item.name }}
      </li>
      <li>
      <a :href="item.url" target="_blank"> link Last.fm </a>
      </li>
      <li>
          Reach: {{ item.reach }}
      </li>
      <li>
          Taggings: {{ item.taggings }}
      </li>
    </ul>
      </div>
  </div>
</template>
<!-- /HTML DEL COMPONENTE -->

<script> //JS DEL COMPONENTE

export default {
  name: 'TopTags',
  //DATA PARA EL BUSCADOR
  data() {
      return{
          search:''
      }
  },
  props: {
      tags: Array
  },
  // CREO UN BUSCADOR POR NAME
  computed: {
        filtered(){
            if(!this.search){
                return this.tags;
            }
            return this.tags.filter( item => 
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
    margin: 1rem 0;
    background: #ddd;
    color: #444;
    border-radius: .3em;
    transition: all .3s ease-out;
}
li.imagen{
    position: absolute;
    left: -1.3em;
    margin-top: -1.3em;
    /*background: #1f2020;*/
    height: 5rem;
    width: 5rem;
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