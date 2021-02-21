const express = require("express");
const {
    addItemToCart,
  
 
} = require("../controller/cart");
const authorize = require("../middleware/authorize")
const router = express.Router();



router.post("/addtocart",authorize,addItemToCart);


module.exports = router;