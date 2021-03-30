const express = require("express");
const {
    addAddress, getAddress 
 
} = require("../controller/address");
const authorize = require("../middleware/authorize")
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Address = require('../models/addressModel.js');



router.post("/create",authorize,addAddress);

router.post("/user/getaddress",authorize, getAddress);

module.exports = router;