const Wishlist = require('../models/wishlist.model');

module.exports = {
    addProduct: async function (userId, product) {
        // Find the wishlist for the user
        let wishlist = await Wishlist.findOne({ userId: userId });

        // If the wishlist doesn't exist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({ userId: userId });
        }

        // Add the product to the wishlist
        wishlist.products.push(product);

        // Save the wishlist
        return wishlist.save();
    },

    removeProduct: async function (userId, productTcin) {
        // Find the wishlist for the user
        let wishlist = await Wishlist.findOne({ userId: userId });

        if (wishlist) {
        // Remove the product from the wishlist
        wishlist.products = wishlist.products.filter(
            product => product.tcin !== productTcin
        );

        // Save the wishlist
            return wishlist.save();
        }   else {
            throw new Error("Wishlist not found");
        }
    }
}
