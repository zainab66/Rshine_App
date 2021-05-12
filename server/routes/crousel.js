const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Crousel = require('../models/crouselModel.js');
const authorize = require("../middleware/authorize")
const isAdmin = require("../middleware/adminAuthorize")
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { default: slugify } = require('slugify');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join( path.dirname(__dirname), 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  

router.post('/create', authorize, isAdmin, upload.array('crouselPictures'), expressAsyncHandler(async (req, res) => {
  
  const {name,createdBy} = req.body;
  let crouselPictures = [];
  if(req.files.length > 0){
        crouselPictures = req.files.map(file => {
          return {img: file.filename}
        });
    }
    const newCrousel = new Crousel({
      name: name,
      crouselPictures,
      createdBy: req.user._id,
    });
    const createdCrousel= await newCrousel.save();
    res.send({ message: 'Crousel Created', crousel: createdCrousel });
    //res.status(200).json({ file: req.files, body:req.body});
  })
  );



/* GET crousels listing. */
router.get('/',
expressAsyncHandler(async (req, res) => {
  const crousels = await Crousel.find({});
  res.send(crousels);
})
);









  module.exports = router;
