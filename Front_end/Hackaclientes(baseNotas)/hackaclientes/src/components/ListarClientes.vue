<template>
  <div>
      <!--<input type="search" v-model="search" placeholder="Busca por nombre">-->
    <!-- <ul v-for="(clientes, index) in clientes" :key="clientes.id"> -->
    <!-- <ul v-for="(item, index)in filtered" :key="item.id"> -->
    <ul v-for="(clientes, index) in clientes" :key="clientes.id">
        <li>
            ID: {{ clientes.id }}
        </li>
        <li>
            NOMBRE: {{ clientes.nombre }}
        </li>
        <li>
            APELLIDO: {{ clientes.apellido }}
        </li>
        <li>
            CIUDAD: {{ clientes.ciudad }}
        </li>
        <li>
            EMPRESA: {{ clientes.empresa }}
        </li>
        <button @click="enviarDatosCliente(index)">
            Editar
        </button>
        <button @click="enviarIndiceCliente(index)">
            Borrar
        </button>
       
    </ul>

  </div>
</template>

<script>
export default {
    name:'listarclientes',
    data(){
        return{
            search: ''
        }
    },
    props: {
        clientes: Array
    },
    methods: {
        enviarDatosCliente(index){
            let datosCliente = this.clientes[index]
            this.$emit('datos', datosCliente)
        },
        enviarIndiceCliente(index){
            let indiceCliente = this.clientes[index].id
            this.$emit('borrar', indiceCliente)
        }
    },
    computed: {
        filtered(){
            if(!this.search){
                return this.clientes;
            }
            return this.character.filter( item => 
                item.name.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    border: 1px solid black;
    border-radius: 20px;
    width: 70%;
    margin: 2% auto;
    background: rgb(131, 130, 155);
    padding: 0;
    transition: all .4s;
}
li {
    padding: 0;
    margin: 1rem;
    border-bottom: 1px solid black;
}
button {
    border-radius: 15px;
    background: rgb(75, 35, 73);
    color:blanchedalmond;
    padding: 0.5rem;
    margin: 1.2rem;
    border: none;
    display: inline-block;
    transition: all .4s;
  }
button:hover {
    cursor: pointer;
    transform: translate(3px, 6px);
}
ul:hover {
    cursor: pointer;
    transform: scale(1.1);
}
</style>