const SupplyList = require('../models/supplyList.model');

module.exports = {
    // export an object with methods for CRUD that affects the Story collection/db
    
        // CRUD!
        // CREATE
        createSupplyList: (req, res) => {
            console.log(req.body)
            SupplyList.create(req.body)
            // Story is the model or Story Schema
                .then(supplyList => res.json(supplyList))
                .catch(err => res.json(err));
        },
        // READ ALL
        // Mongoose method find()
        getAllSupplyLists: (req, res) => {
            SupplyList.find({})
            // This is an empty object {} that is a query paramater to fetch all documents in the Story collection
                .then(allSupplyLists => {
                    console.log(allSupplyLists);
                    res.json(allSupplyLists);
                })
                // allStories must match from .then(allStories
                // console.log(allStories)
                // to res.json(allStories)
                //  When the database query is successful, the method executes the then callback function. It receives an array of allStories as a parameter. 
                // the console logs the allStories array for debugging
                // the array is then sent as a JSON response
                .catch(err => {
                    console.log("getAllSupplyLists Error!", err)
                    res.json(err)
                });
        },
        // READ ONE
        getOneSupplyList: (req, res) => {
            SupplyList.findById(req.params.id)
                .then(oneSupplyList => res.json(oneSupplyList))
                .catch(err => res.json(err));
        },
        // UPDATE
        updateSupplyList: (req, res) => {
            SupplyList.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            // new: true will return the new document instead of the old one.
                .then(updatedSupplyList => res.json(updatedSupplyList))
                .catch(err => res.json(err));
        },
        // DELETE
        deleteSupplyList: (req, res) => {
            console.log("req, params", req.params.id)
            SupplyList.findByIdAndDelete(req.params.id)
                .then(result => res.json(result))
                .catch(err => {console.log(err); res.json(err)});
        }
    }