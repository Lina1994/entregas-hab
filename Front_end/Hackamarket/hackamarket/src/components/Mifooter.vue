<template>
  <div id="app">
    <div id="footered">
      <hr>
      <p>
          Created by Lucía C. G. C. 
      </p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'mifooter',
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
}

</style>