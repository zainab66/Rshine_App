const express = require('express');
const router = express.Router();
const data = require('../data.js');
const User  = require('../models/userModel.js');

const expressAsyncHandler = require('express-async-handler');

/* GET users listing. */
router.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);
module.exports = router;
