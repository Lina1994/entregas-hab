<template>
  <div>
      <ul>
          <li v-for="toy in toys" :key="toy.id">
              <p>
                  {{ toy.toy_name }}
              </p>
                  <img :src="toy.image">
              <p>
                  Edad recomendada:
                  {{ toy.recomended_age }}
              </p>
              <p>
                  Fecha:
                  {{ toy.date }}
              </p>
              <button>
                  GET THIS TOY
              </button>
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'ToysListEntries',
        props:{
            toys: Array
        },
        methods: {
        }
    }
</script>

<style scoped>

li {
    list-style-type: none;
    border: 1px solid rgb(14, 13, 13);
}

img {
    max-width: 40%;
}

</style>