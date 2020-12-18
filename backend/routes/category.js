const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Category = require('../models/categoryModel.js');
const authorize = require("../middleware/authorize")
const isAdmin = require("../middleware/adminAuthorize")
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join( path.dirname(__dirname), 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });


  function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
       
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }
  

router.post('/create',authorize ,isAdmin, upload.single('categoryImage'), (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObj.categoryImage = "http://localhost:3001/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat =  new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
});

router.get('/', (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
});


// router.post('/create',authorize ,isAdmin, upload.single('categoryImage'), addCategory);
// router.get('/', getCategories);

module.exports = router;
