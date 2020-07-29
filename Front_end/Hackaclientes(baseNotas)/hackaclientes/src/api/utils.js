import jwt from 'jwt-decode'
import axios from 'axios'

const ENDPOINT = 'http://localhost:3050'

//// LOGING //////
export function loging(user, password) {
    try{
        axios.post(`${ENDPOINT}/auth`, {
            user: user,
            password: password
        })
        .then(function(response){
            console.log(response)
            setAuthToken(response.data.token)
        } )
    }catch(error){
        console.log(error)
    }
}

///// FUNCION PARA GUARDAR LOCALSTORAGE JSONWEBTOKEN ////
export function setAuthToken(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('AUTH_TOKEN_KEY', token)
}

///// LOGOUT
export function logout(){
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('AUTH_TOKEN_KEY')
}