const SupplyList = require('../models/supplyList.model');
//import user token to place as creator value
//use the secret key on .env file, use process for .env, then key variable name
const secret = process.env.SECRET_KEY;
//refer to web token - package we installed 
const jwt = require('jsonwebtoken');

module.exports = {
    // export an object with methods for CRUD that affects the Story collection/db

    // CRUD!
    // CREATE
    createSupplyList: (req, res) => {
        //console.log(req.body)
        //get logged in users token to place as creator value for supplyList model
        const user = jwt.verify(req.cookies.usertoken, secret);
        SupplyList.create({ ...req.body, creator: user })
            .then(supplyList => {
                console.log("createSupplyList", res )
                res.json(supplyList)
            })
            .catch(err => res.json(err));
    },
    //READ ALL for logged in teachers lists
    getAllByLoggedTeacher: (req, res) => {
        const teacher = jwt.verify(req.cookies.usertoken, secret);
        SupplyList.find({ creator: teacher._id })
            // .populate('creator')
            .then(e => res.json(e))
            .catch(e => res.status(400).json({ message: 'problem getAllByLoggedTeacher', error: e }))
    },
    //READ ALL for selected teacher id
    getAllBySelectedTeacher: (req, res) => {
        const teacher = (req.params.id); //get selected teacherID from form
        SupplyList.find({ creator: teacher._id })
            // .populate('creator')
            .then(e => res.json(e))
            .catch(e => res.status(400).json({ message: 'problem getAllBySelectedTeacher', error: e }))
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
            .then(oneSupplyList => {
                res.json({supplyList: oneSupplyList})
            })
            .catch((err) => {
                console.log("findOne error", err);
                res.status(400).json(err)
            });
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
            .catch(err => { console.log(err); res.json(err) });
    }
}

