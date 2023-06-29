// const api = require('../config/api.config');



// module.exports = {
//     searchProducts: function (searchTerm, sortBy = 'best_seller') {
//         const params = {
//             api_key: "3133DEE707A24A4CA17342A3BA693B14",
//             type: "search",
//             search_term: searchTerm,
//             sort_by: sortBy
//         };
//         return api.makeRequest(params);
//     },

//     getProduct: function (tcin) {
//         const params = {
//             api_key: "3133DEE707A24A4CA17342A3BA693B14",
//             type: "product",
//             tcin: tcin
//         };
//         return api.makeRequest(params);
//     }
// }




const axios = require('axios');
const onSubmitHandlerApi = (e) => {
    e.preventDefault();

// set up the request parameters
const params = {
  api_key: "3133DEE707A24A4CA17342A3BA693B14",
  type: "search",
  search_term: "crayons",
  sort_by: "best_seller"
}

// make the http GET request to RedCircle API
axios.get('https://api.redcircleapi.com/request', { params })
  .then(response => {
    setSearchResults(response.data.search_results);
    // print the JSON response from RedCircle API
    console.log(JSON.stringify(response.data, 0,2));

  }).catch(error => {
    // catch and print the error
    console.log(error);
  })
}