<!-- HTML DE LA VISTA -->
<template>
  <div class="topartist">
     <img src="https://www.avalosdesign.com/images/logos/artmusic2.gif">
    <TopArtistComp :artists="artists"/>
  </div>
</template>
<!-- /HTML DE LA VISTA -->

<script> //JS DE LA VISTA
// IMPORTO API Y COMPONENTE
import TopArtistComp from '@/components/TopArtistComp.vue'
import api from '@/api/index.js'

export default {
  name: 'TopArtist',
  components: {
    TopArtistComp
  },
  data(){
    return {
      artists: []
    }
  },
  created(){
  api.getArtists().then(response => (this.artists = response.data.topartists.artist))
  }
}
</script>

<style scoped>
* {
    text-align: center;
}
img{
  max-width: 225px;
}
</style>

