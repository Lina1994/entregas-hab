<template>
  <div>
    <ul v-for="productos in productos" :key="productos.id">
        <li>
            ID: {{ productos.id }}
        </li>
        <li>
            NOMBRE: {{ productos.nombre }}
        </li>
    </ul>

  </div>
</template>

<script>
export default {
    name:'listarproductos',
    props: {
        productos: Array
    },
    methods: {
        /*
        enviarDatosCliente(index){
            let datosCliente = this.clientes[index]
            this.$emit('datos', datosCliente)
        },
        enviarIndiceCliente(index){
            let indiceCliente = this.clientes[index].id
            this.$emit('borrar', indiceCliente)
        }
        */
    }/*,
    computed: {
        filtered(){
            if(!this.search){
                return this.clientes;
            }
            return this.character.filter( item => 
                item.name.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    }*/
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