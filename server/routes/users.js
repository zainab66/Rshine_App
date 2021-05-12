const express = require('express');
const router = express.Router();
const data = require('../data.js');
const User  = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const generateToken = require('../utils.js');
const authorize = require("../middleware/authorize")
const isAdmin = require("../middleware/adminAuthorize")
const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require("../middleware/validInfo")
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const expressAsyncHandler = require('express-async-handler');




const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename(req, file, cb) {
    cb(null,file.originalname);
  },
});


const upload = multer({ storage });





/* GET users listing. */
router.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

router.post('/signin',expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          profilePicture: user.profilePicture,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

router.post('/register',upload.single('profilePicture'),expressAsyncHandler(async (req, res) => {
  const user2 = await User.findOne({ email: req.body.email });
  if (user2)return res.status(401).send({message:'User already exists'});
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      profilePicture :req.file.originalname,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      profilePicture :createdUser.profilePicture,
      token: generateToken(createdUser),
    });
  })
);

router.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


router.put('/profile', authorize, upload.single('profilePicture'), expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      user.profilePicture = req.file.originalname;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        profilePicture: updatedUser.profilePicture,
        token: generateToken(updatedUser),
      });
    }
  })
);


router.get(
  '/',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);


router.delete(
  '/:id',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


router.put(
  '/:id',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


module.exports = router;
