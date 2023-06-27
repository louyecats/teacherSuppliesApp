const api = require('../config/api');

module.exports = {
    searchProducts: function (searchTerm, sortBy = 'best_seller') {
        const params = {
        api_key: "3133DEE707A24A4CA17342A3BA693B14",
        type: "search",
        search_term: searchTerm,
        sort_by: sortBy
        };
        return api.makeRequest(params);
    },

    getProduct: function (tcin) {
        const params = {
        api_key: "3133DEE707A24A4CA17342A3BA693B14",
        type: "product",
        tcin: tcin
        };
        return api.makeRequest(params);
    }
}
