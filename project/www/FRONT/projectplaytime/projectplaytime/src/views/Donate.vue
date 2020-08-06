<template>
  <div>
      <h1>
          Donaciones
      </h1>
      <p v-show="error">
          * {{ message }} *
      </p>

      <p v-show="errorMsg">
         ** Tienes campos vacíos.
      </p>
      <input type="text" v-model="image" placeholder="URL imagen">
      <p/>
      <input type="text" v-model="toy_name" placeholder="Nombre">
      <p/>
      <input type="text" v-model="description" placeholder="Descripción">
      <p/>
      <input type="text" v-model="locality" placeholder="Ciudad">
      <p/>
      <input type="text" v-model="recomended_age" placeholder="Edad recomendada">
      <p/>
      <input type="text" v-model="category" placeholder="Categoría">
      <p/>
      <button @click="validatingData()">
          Donar
      </button>
      
  </div>
</template>

<script>
import axios from 'axios';
import { isUser } from '../../../../../BACKENDAPI/middlewares/isUser.js';
import { newEntry } from '../../../../../BACKENDAPI/controllers/toys/newEntry.js';
//import swal from 'sweetalert';

export default {
    name: 'Donate',
    data() {
        return {
            image: '',
            description: '',
            locality: '',
            recomended_age: '',
            category: '',
            toy_name: '',
            creatreClient: false,
            errorMsg: false,
            error: false,
            message: '',
            authtoken: ''

        }
    },
    methods: {
        validatingData(){
            if(this.toy_name === '' ||
            this.image === '' ||
            this.description === '' ||
            this.locality === '' ||
            this.recomended_age === '' ||
            this.category === ''){
                //alert('No puedes dejar campos vacíos')
                this.errorMsg = true;
                this.creatreClient = false;
                /*swal({
                  title: "¡ALTO!",
                  text: "Quedan campos por cubrir",
                  icon: "warning",
                });*/
            }
            else {
                this.errorMsg = false;
                this.creatreClient = true;
                this.addNewClient()
            }
        },
        async addNewClient(){
            if(this.creatreClient === true){
                let authtoken = localStorage.getItem('AUTH_TOKEN_KEY')
                console.log(authtoken);
                try {
                    
                    const response = await axios.post('http://localhost:3050/entries',
                    {
                            image: this.image,
                            description: this.description,
                            locality: this.locality,
                            recomended_age: this.recomended_age,
                            category: this.category,
                            toy_name: this.toy_name,
                        }, {
                        headers: {
                            Authorization: authtoken
                        } 
                    
            })
            .then((response)=>{
                console.log(response)
            })
            } catch (error) {
                console.log(error)
            }
            this.creatreClient = false;
            this.image = ''
            this.description = ''
            this.locality = ''
            this.recomended_age = ''
            this.category = ''
            this.toy_name = ''
            //location.reload()
              //swal("¡Good job!", "¡Cliente creado con éxito!", "success");
            } else {
                console.log('Yo no debería estar aquí.')
            } 
        }
        /*
        async goLogin() {
            const ENDPOINT = 'http://localhost:3050'

            if(this.email === '' || this.password === '') {
                alert('Te faltan datos.')
                this.error = true;
                this.message = 'Faltan campos';
            } else {
                try {
                    const response = await axios.post(`${ENDPOINT}/users/login`, {
                        //.post('http://localhost:3050/users/login', {
                        email: this.email,
                        password: this.password
                })
                .then((response) => {
                    console.log(this.email);
                    console.log(this.password);
                    console.log('Loging OK');
                } )
                /setTimeout( () => {
                    this.$router.push('/home')
                    location.reload()
                }, 500 );

                } 
                 catch (error) {
                     console.log(this.email, this.password)
                     console.log('Loging incorrecto')
                     console.log(error.response.data.message);
                     this.error = true;
                     this.message = error.response.data.message;
                    
                }
                
            }
            
        }*/
        
    }
}
</script>

<style scopede>

</style>