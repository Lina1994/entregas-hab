import config from './config.js'

// LLAMAMOS A AXIO
const axios = require('axios').default;

// LLAMAMOS A LA API
const apiKey = config.apiKey
const BASE_URL = "https://ws.audioscrobbler.com/"
const URL_GEO = "2.0/?method=geo.gettopartists&country=spain&api_key="+apiKey+"&format=json"
const URL_TRACKS = "/2.0/?method=geo.gettoptracks&country=spain&api_key="+apiKey+"&format=json"
const URL_TAGS = "/2.0/?method=chart.gettoptags&api_key="+apiKey+"&format=json"

// LLAMAMOS A LOS TOPARTISTAS CON LA FUNCIÓN getArtist
async function getArtists() {
    try {
        const response = await axios.get(`${BASE_URL}${URL_GEO}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}
// LLAMAMOS A LOS TOPTAGS CON LA FUNCIÓN getArtist
async function getTopTags() {
    try {
        const response = await axios.get(`${BASE_URL}${URL_TAGS}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// LLAMAMOS A LOS TOPTRACKS CON LA FUNCIÓN getArtist
async function getTopTracks() {
    try {
        const response = await axios.get(`${BASE_URL}${URL_TRACKS}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// EXPORTAMOS FUNCIÓN
export default {
    getArtists,
    getTopTags,
    getTopTracks
}

