const Cart = require("../models/cartModel.js");


exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
            const isItemAdded = cart.cartItems.find(c => c.product == req.body.cartItems.product);
            const isPriceAdded = cart.cartItems.find(c => c.price == req.body.cartItems.price);
            let condition, action;
            if (isItemAdded && isPriceAdded) {
                condition = { "user": req.user._id, "cartItems.product": req.body.cartItems.product,"cartItems.price": req.body.cartItems.price };
                action = {
                    "$set": {
                        "cartItems.$": {

                            ...req.body.cartItems,
                            quantity: isItemAdded.quantity + req.body.cartItems.quantity
                        }
                    }
                };

            } else {
                condition = { user: req.user._id };
                action = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }
            }

            Cart.findOneAndUpdate(condition, action)
                .exec((error, _cart) => {
                    if (error) return res.status(400).json({ error });
                    if (_cart) {
                        return res.status(201).json({ cart: _cart });
                    }
                })
            //res.status(200).json({ message: cart })
        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            cart.save((error, cart) => {
                if (error) return res.status(400).json({ error });
                if (cart) {
                    return res.status(201).json({ cart });
                }
            })
        }
    });
};

// exports.addItemToCart = (req, res) => {

//     const cart = new Cart({
//         user: req.user._id,
//         cartItems: req.body.cartItems
//     });
//     cart.save((error, cart) => {
//         if (error) return res.status(400).json({ error });
//         if (cart) {
//             return res.status(201).json({ cart });
//         }
//     })

// };










