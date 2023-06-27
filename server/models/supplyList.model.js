const mongoose = require('mongoose');

const SupplyListSchema = new mongoose.Schema({
    // create CRM Customer Relationship Manager and a new schema instance with the function mongoose.Schema
    // this is creating a new model named SupplyList


    SupplyListName: {
        type: String,
        required: [true, "Supply List name is required."],
        minlength: [2, "Supply List name must be at least 2 characters long."],
        maxlength: [255, "Supply List name cannot be more than 255 characters long."]
        //custom validations for the backend
    },
    SupplyListItems: {
        type: String,
        required: [true, "Items are required."],
        minlength: [2, "Items must be at least 2 characters long."],
        maxlength: [255, "Items cannot be more than 255 characters long."]
        //custom validations for the backend

    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    }

},
    { timestamps: true });



module.exports = mongoose.model('SupplyList', SupplyListSchema);

/* TEACHER JOIN
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
}
*/
