<template>
  <div>
      <ul>
          <li v-for="(statue, index) in statues" :key="statue.id">
              <p>
                  {{ statue.nombre }}
              </p>
              <p>
                  {{ statue.artista }} {{ statue.separation }} {{ statue.localización }}
              </p>
              <img :src="statue.url" :title="statue.title" :alt="statue.alt" />
              <p> </p>
              <button @click="seeAlert(index)">
                  Sacar nombre.
              </button>
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
    name: 'Pictures',
    props: {
        statues: Array
    },
    methods: {
        seeAlert(index){
            this.$emit('seeAlert', index)
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
li {
    border-bottom: 1px solid black;
    
}
.collection img {
    width: 60%;
    padding: 5px;
    border: 2px solid rgb(22, 20, 20);
    border-radius: 8%;
}
.kingdom img {
    width: 60%;
    padding: 10px;
    border: 3px solid rgb(39, 28, 28);
    border-radius: 50%;
    background-color: rgba(78, 87, 109, 0.7);
}
p{
    color: #000;
}

</style>