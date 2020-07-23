<template>
  <div id="app">
    <!-- 3 PASO: DECLARA COMPONENTE -->
    <menucustom :username="name"/>
    <router-view/>
    <footercustom/>
  </div>
</template>

<script>
// 1 PASO: IMPORTAR COMPONENTE
import menucustom from '@/components/MenuCustom.vue'
import footercustom from '@/components/FooterCustom.vue'

export default {
  name: 'App',
  // 2 PASO: REGISTRAR COMPONENTE
  components:{
    menucustom,
    footercustom
  },
  data(){
    return {
      name: 'Lina'
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

</style>
