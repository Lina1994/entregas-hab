<template>
  <div>
      <!--<ul v-for="(user, index) in user" :key="user.id">
          <li>
              {{user}}
          </li>
      </ul>-->
              <img :src="user.image">
              <p>
                  Email: {{user.email}}
              </p>
              <p>
                  Nombre: {{user.user_name}}
              </p>
              <p>
                  Apellido: {{user.surname}}
              </p>
              <p>
                  Dirección: {{user.direction}}
              </p>
              <p>
                  Cumpleaños: {{user.birth_date}}
              </p>
              <p>
                  Teléfono: {{user.phone}}
              </p>
              <p>
                  De la familia desde: {{user.registrationDate}}
              </p>
              

  </div>
</template>

<script>
    export default {
        name: 'ProfileEntrie',
        props:{
            user: Object
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