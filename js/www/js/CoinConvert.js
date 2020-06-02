"use strict";

/*
Accede con fetch a la información de la siguiente API: 
https://api.exchangerate-api.com/v4/latest/EUR. 
Dado un valor en euros (EUR), convierte dicha cantidad a 
dólares (USD). Por último convierte el resultado obtenido 
en dólares a yenes (JPY).
*/

async function coinConvert(base,toConvert,importe) {
    const converterPage = await fetch('https://api.exchangerate-api.com/v4/latest/'+ base);
    const convert = await converterPage.json();
    const convertion = importe * convert.rates[toConvert];
    console.log(importe +' '+ base + ' = ' + convertion + ' ' + toConvert)
    const yenizatorPAGE = await fetch('https://api.exchangerate-api.com/v4/latest/'+ toConvert);
    const yenizator = await yenizatorPAGE.json();
    const yenization = convertion * yenizator.rates.JPY;
    console.log(convertion + ' '+ toConvert + ' = '+ yenization+ ' JPY');
    }
// coinConvert(moneda origen, moneda a cambiar, cantidad origen)
coinConvert('EUR','USD', '20');


