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
            // ME GUARDA EL TOKEN
            setAuthToken(response.data.token)
            // ME GUARDO EL ROLE
            setIsAdmin(response.data.admin)
            // ME GUARDO EL NOMBRE DE USER
            setName(response.data.user)
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

/////// FUNCION PARA RECUPERAR EL TOKEN DE LOCALSTORAGE
export function getAuthToken(){
    return localStorage.getItem('AUTH_TOKEN_KEY')
}

/// FUNCIÓN PAR CONSEGUIR FECHA CADUCIDAD DE TOKEN
export function tokenExpiration(encodedToken){
    let token = jwt(encodedToken)
    if(!token.exp) {
        return null
    }
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date
}

//// FUNCIÓN QUE COMPRUEBA SI EL TOKEN ES OK
export function isExpired(token) {
    let expirationDate = tokenExpiration(token)
    return expirationDate < new Date()
}

/// FUNCIÓN QUE COMPRUEBA SI LA PERSONA ESTA LOGUEADA Y SU TOKEN ES VÁLIDO
export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isExpired(authToken)
}

// FUNCION PARA GUARDAR ADMIN EN LOCALESTORAGE
export function setIsAdmin(admin){
    localStorage.setItem('ROLE', admin)
}

//// FUNCION QUE COMPRURECUPERAEBA ADMIN DE LOCALSTORAGE
export function getIsAdmin(){
    return localStorage.getItem('ROLE')
}

///// FUNCION QUE COMPRUEBA SI ES ADMIN O NO
export function checkIsAdmin(){
    let role = null
    let admin = getIsAdmin()

    if(admin === 'true'){
        role = true
    } else {
        role = false
    }
    return role
}

////// FUNCION PARA GUARDAR NOMBRE EN LOCALSTORAGE
export function setName(user){
    localStorage.setItem('NAME', user)
}

///// FUNCION PARA RECUPERAR NOMBRE USER DE LOCALSTORAGE
export function getName() {
    return localStorage.getItem('NAME')
}

///// LOGOUT
export function logout(){
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('AUTH_TOKEN_KEY')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('NAME')
}


