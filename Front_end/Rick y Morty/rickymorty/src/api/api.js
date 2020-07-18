// CONST AXIOS
const axios = require('axios').default;
// CONST API RICKYMORTY
const APIURL = 'https://rickandmortyapi.com/api/';
const PAGE = 1;

// FUNCION PARA CONSEGUIR LOS PERSONAJES
function getAllCharacter() {
    return axios.get(`${APIURL}/character/?page=${PAGE}`)
}

// EXPORTANDO FUNCIONES
export default {
    getAllCharacter
}