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
        parentId: cate.parentId,
       
        childr: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }
  

router.post('/create',authorize ,isAdmin, upload.single('categoryImage'), expressAsyncHandler(async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };

  if (req.file) {
    categoryObj.categoryImage = "/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat =  new Category(categoryObj);
  const createdCategory = await cat.save();
  res.send({ message: 'Category Created', category: createdCategory });

  // cat.save((error, category) => {
  //   if (error) return res.status(400).json({ error });
  //   if (category) {
  //     return res.status(201).json({ category });
  //   }
  // });
}));

router.get('/',  expressAsyncHandler(async (req, res) =>{
  const categories = await Category.find({});
    const categoryList = createCategories(categories);

    res.send(categoryList);

}));

router.post('/update',authorize ,isAdmin,  upload.array("categoryImage"),expressAsyncHandler(async (req, res) =>{
 
 //res.status(200).json({body:req.body});
 
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
}));


router.post('/delete',authorize ,isAdmin,  expressAsyncHandler(async (req, res) =>{
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findByIdAndDelete({
      _id: ids[i]._id,
      createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }
  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }

}));


module.exports = router;
