const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/search', (req, res) => {
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
