const axios = require('axios');

module.exports = {
  makeRequest: async function (params) {
    try {
        const response = await axios.get('https://api.redcircleapi.com/request', { params });
        return response;
}       catch (error) {
        throw error;
        }
    }
}