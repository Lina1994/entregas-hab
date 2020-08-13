//import jwt from 'jwt-decode'
//import axios from 'axios'

/// FUNCIÓN QUE COMPRUEBA SI LA PERSONA ESTA LOGUEADA Y SU TOKEN ES VÁLIDO
export function isLoggedIn() {
    let authToken = localStorage.getItem('AUTH_TOKEN_KEY')
    return !!authToken
    /* && !this.isExpired(authToken)*/
  }

/// FUNCIÓN PAR CONSEGUIR FECHA CADUCIDAD DE TOKEN
/*export function tokenExpiration(encodedToken){
    let token = jwt(encodedToken)
    if(!token.exp) {
        return null
    }
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date
}*/

//// FUNCIÓN QUE COMPRUEBA SI EL TOKEN ES OK
/*export function isExpired(token) {
    let expirationDate = this.tokenExpiration(token)
    return expirationDate < new Date()
}*/