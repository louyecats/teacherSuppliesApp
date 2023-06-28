const axios = require('axios');

module.exports = {
  makeRequest: async function (params) {
//     try {
//         const response = await axios.get('https://api.redcircleapi.com/request', { params });
//         return response;
// }       catch (error) {
//         throw error;
//         }
console.log('axios or api or wehatever')
axios.get('https://api.redcircleapi.com/request', { params })
  .then(response => {

    // print the JSON response from RedCircle API
    console.log(JSON.stringify(response.data, 0, 2));

  }).catch(error => {
    // catch and print the error
    console.log(error);
  })
  return ' '
    }
}