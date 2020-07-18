<template>
  <div>
      <input type="search" v-model="search" placeholder="Busca por nombre">
    <ul v-for="item in filtered" :key="item.id">
        <li>
            ID: {{ item.id }}
        </li>
        <li>
            NOMBRE: {{ item.name }}
        </li>
        <li>
           <img :class="item.status" :src="item.image"/> 
        </li>
        <li :class="item.status">
            ESTADO: {{ item.status }}
        </li>
        <li>
            ESPECIE: {{ item.species }}
        </li>
        <li>
            ORIGEN: {{ item.origin.name }}
        </li>
        <li>
            PARADERO: {{ item.location.name }}
        </li>
        <li>
            GÉNERO: {{ item.gender }}
        </li>
        <li>
            CREADO: {{ item.created }}
        </li>
      <!--  <li>
            Episodio/s: {{ item.episode }}
        </li> -->
    </ul>

  </div>
</template>

<script>
export default {
    name:'CharacterCard',
    data(){
        return{
            search: ''
        }
    },
    props: {
        character: Array
    },
    computed: {
        filtered(){
            if(!this.search){
                return this.character;
            }
            return this.character.filter( item => 
                item.name.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    }
}
</script>

<style scoped>
img{
    border-radius: 50%;
}
ul{
    list-style: none;
    border-bottom: 1px solid black;
}
img.Dead {
    border: 5px solid brown;
}
.Dead {
    color: brown;
}
.Alive {
    color: yellowgreen;
}
img.Alive {
    border: 5px solid yellowgreen;
}
.unknown {
    color: rgb(168, 97, 14);
}
img.unknown {
    border: 5px solid rgb(235, 117, 49);
}
</style>