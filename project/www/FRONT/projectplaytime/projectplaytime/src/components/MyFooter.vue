<template>
  <div id="app">
    <div id="footered">
      <hr>
      <span>
          Created by Lucía C. G. C.
      </span>
      <router-link :to="{ name: 'About' }">Sobre el proyecto</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'MyFooter',
    props: {
        elfooter: String
    }
}
</script>

<style scoped>
#footered {
    position: relative;
    left: 0;
    bottom: -10px;
    width: 100%;
    text-align: center;
    background-color: rgb(254, 254, 254);
    height: 3rem;
}

</style>