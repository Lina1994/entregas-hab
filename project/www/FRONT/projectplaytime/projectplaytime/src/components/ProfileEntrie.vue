<template>
  <div>
      <!--<ul v-for="(user, index) in user" :key="user.id">
          <li>
              {{user}}
          </li>
      </ul>-->
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