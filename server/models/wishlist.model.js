const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [{
        type: Object,
    }],
});

module.exports = mongoose.model('Wishlist', WishlistSchema);