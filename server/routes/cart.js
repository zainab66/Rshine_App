const express = require("express");
const {
    addItemToCart,
    getCartItems
  
 
} = require("../controller/cart");
const authorize = require("../middleware/authorize")
const router = express.Router();



router.post("/addtocart",authorize,addItemToCart);

router.post("/user/getCartItems",authorize, getCartItems);

module.exports = router;