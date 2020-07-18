<!-- HTML DE LA VISTA -->
<template>
  <div class="toptracks">
     <img src="https://static.wixstatic.com/media/1ed71a_fc16f7bf4f7942b08e332ad6e56b3665~mv2.png/v1/fill/w_842,h_342,al_c,q_85,usm_0.66_1.00_0.01/advanced%20tracks%202.webp">
    <TopTracksComp :tracks="tracks"/>
  </div>
</template>
<!-- /HTML DE LA VISTA -->


<script> // JS DE LA VISTA
// IMPORTO API Y COMPONENTE
import TopTracksComp from '@/components/TopTracksComp.vue'
import api from '@/api/index.js'

export default {
  name: 'Toptracks',
  components: {
    TopTracksComp,
  },
  data(){
    return {
      tracks: []
    }
  },
  created(){
  api.getTopTracks().then(response => (this.tracks = response.data.tracks.track))
  }
}
</script>

<style scoped>
* {
    max-width: 100%;
    text-align: center;
}
</style>

