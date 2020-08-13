<template>
  <div class="profile">
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
    border-radius: 50%;
}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 760px) {

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1000px) {

}
/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1500px */
@media (min-width: 1700px) {
img {
    position: fixed;
    left: 30rem;
    height: 15rem;
}
.profile{
    margin-top: 10rem;
}
}

</style>