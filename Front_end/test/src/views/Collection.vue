<template>
  <div class="collection">
      Collection
      <pictures :statues="statues"
      v-on:seeAlert="nombreObra" />
  </div>
</template>

<script>
import pictures from "@/components/Pictures.vue"

export default {
   name: 'Collection',
   components: {
       pictures
   },
   data() {
       return {
        statues: [
            { nombre: 'Estatua 1',
            url: 'https://images.unsplash.com/photo-1562315292-5e822aacd150?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=959&q=80'
            },
            { nombre: 'Estatua 2',
            url: 'https://images.unsplash.com/photo-1539037623414-d22113aa0187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
            },
            { nombre: 'Estatua 3',
            url: 'https://images.unsplash.com/photo-1531725308662-76bf5ebb43f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            },
            { nombre: 'Estatua 4',
            url: 'https://images.unsplash.com/photo-1562617327-e29f51628135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            },
            { nombre: 'Estatua 5',
            url: 'https://images.unsplash.com/photo-1549264814-7fe7816d0b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=954&q=80'
            },
            { nombre: 'Estatua 6',
            url: 'https://images.unsplash.com/photo-1570227053432-6ecb9e01ef72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            }
        ]
       }
   },
   methods: {
       nombreObra(index){
           let statueName= this.statues[index].nombre;
           alert( 'nombre: '+statueName)
       }
   }
}
</script>

<style scoped>

</style>