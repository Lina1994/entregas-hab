<template>
  <div class="about">
    <naveg/>
    <ul>
      <li>
        <img src="https://scontent.fmad7-1.fna.fbcdn.net/v/t1.0-9/81464049_2569387230015202_200040842000334848_n.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=4reD5Hv7F9gAX-7Qq3s&_nc_ht=scontent.fmad7-1.fna&oh=d91071c8defc6b45e2735d3abe968954&oe=5F466F96"
        alt="Foto perfil" class="perfil">
        <h1>
          Lucía Carolina González Chans
        </h1>
      </li>
      <li>
        <p>
        Creadora agobiada de este y otros proyectos
        </p>
        <a href="mailto:luciagc_94@outlook.es">luciagc_94@outlook.es</a>
        <p></p>
        <a href="https://www.facebook.com/profile.php?id=100008318494747" target="_blank">Facebook</a> 
      </li>
    </ul>
    <h2>It's a me, Mario!</h2>
    <img src="https://vignette.wikia.nocookie.net/mario-fanon/images/c/c4/Mario_%28SMPUB%29.png/revision/latest?cb=20170503212522&path-prefix=es" 
    alt="Mario bros" >
    <elfooter class="foote"/>
  </div>
</template>

<script>
// @ is an alias to /src
import naveg from '@/components/Navegador.vue'
import elfooter from '@/components/Mifooter.vue'

export default {
  name: 'About',
  components: {
      naveg,
      elfooter
  },
  data(){
    return {
    }
  },
  methods:{ 
  }
}
</script>

<style scoped>
.foote {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 90%;
    width: 100%;
    text-align: center;
  }
  img {
  position: fixed;
  right: 1rem;
  bottom: 4.8rem;
  max-width: 100vh;
  max-height: 100vh;
  height: 25rem;
  object-fit: cover;
  transition: all .4s;
}
h2 {
  position: fixed;
  right: 13rem;
  bottom: 23rem;
  border: 1px solid black;
  padding: 1rem;
  border-radius: 20px 20px 3px 20px;
}
.perfil {
  position:static;
  left: 1rem;
  top: 10rem;
  max-width: 100vh;
  max-height: 100vh;
  height: 12rem;
  width: 12rem;
  object-fit: cover;
  transition: all .4s;
  border-radius: 50%;
}
ul {
    list-style: none;
}

</style>