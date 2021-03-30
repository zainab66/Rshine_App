const express = require("express");
const {
    addItemToCart,
    getCartItems,
    removeCartItems
 
} = require("../controller/cart");
const authorize = require("../middleware/authorize")
const router = express.Router();
const Cart = require("../models/cartModel.js");

const expressAsyncHandler = require('express-async-handler');


router.post("/addtocart",authorize,addItemToCart);

router.post("/user/getCartItems",authorize, getCartItems);
router.post("/removeItem",authorize,removeCartItems);


// router.delete(
//     '/removeItem',
//     authorize,
//     expressAsyncHandler(async (req, res) => {
//         const { productId } = await Cart.findById(req.params.id);
     
        
//       if (productId) {
//         const deleteProduct = await productId.remove();
//         res.send({ message: 'Product Deleted', product: deleteProduct });
//       } else {
//         res.status(404).send({ message: 'Product Not Found' });
//       }
//     })
//   );
  

module.exports = router;