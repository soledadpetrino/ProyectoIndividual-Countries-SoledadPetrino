// const axios = require('axios');
// const apiUrl = 'https://restcountries.com/v3/all';
// const { Country } = require('../db.js');


// const dataApi = async () => {

//     const apiData = await axios(apiUrl).data;
//     const countries = await apiData.map(country => {
//         return {
//             id: country.cca3,
//             name: country.name.common !== null ? country.name.common: 'No se encontró el nombre del pais',
//             flag: country.flags !== null ? country.flags[0]: 'No se encontró la bandera del pais',
//             region: country.region !== null ? country.region: 'No se encontró la región del pais',
//             capital: country.capital !== null ? country.capital[0]: 'No se encontró la capital del pais',
//             subregion: country.subregion,
//             area: country.area,
//             population: country.population
//         }
//     });
//     return countries;
// }

// const completeDataBase = async () => {
//     try {
//         /*Con el método findAll compruebo si mi db tiene datos*/
//         let dbCountry = await Country.findAll();
//         if(dbCountry.length===0) {
//             const countries = await dataApi()
//             await Country.bulkCreate(countries)
//         }
//     } catch (error) {

//     }
// }

// module.exports = { completeDataBase };