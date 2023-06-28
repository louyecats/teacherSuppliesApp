const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/search', (req, res) => {
    console.log('searching')
    productsController.searchProducts(req.query.searchTerm, req.query.sortBy)
            .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "An error occurred." });
        });
    });

    router.get('/product/:tcin', (req, res) => {
    productsController.getProduct(req.params.tcin)
            .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "An error occurred." });
        });
});

module.exports = router;
