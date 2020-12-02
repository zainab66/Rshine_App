const express = require('express');
const router = express.Router();
const data = require('../data.js');
const User  = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils.js');

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

router.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: jwtGenerator(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);







module.exports = router;
