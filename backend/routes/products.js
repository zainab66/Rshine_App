const express = require('express');
const router = express.Router();
const data = require('../data.js');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel.js');
const authorize = require("../middleware/authorize")
const isAdmin = require("../middleware/adminAuthorize")
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { default: slugify } = require('slugify');
const Category = require('../models/categoryModel.js');
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controller/product");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join( path.dirname(__dirname), 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


/* GET products listing. */
router.get('/',
expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
    res.send(products);
})
);

router.get('/seed',
expressAsyncHandler(async (req, res) => {
  //await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
})
);


router.get('/prod/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})
);


router.post('/create', authorize, isAdmin, upload.array('productPictures'), expressAsyncHandler(async (req, res) => {
  const {name,price,description,category,countInStock,createdBy} = req.body;
  let productPictures = [];
  if(req.files.length > 0){
    productPictures = req.files.map(file => {
      return {img: file.filename}
    });
  }
  const newProduct = new Product({
    name: name,
    slug : slugify(name),
    price,
    description,
    productPictures,
    category,
    countInStock,
    createdBy: req.user._id,
  });
  const createdProduct = await newProduct.save();
  res.send({ message: 'Product Created', product: createdProduct });
  //res.status(200).json({ file: req.files, body:req.body});
})
);



router.put('/:id', authorize, isAdmin, expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated', product: updatedProduct });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})
);

router.get("/productes/:slug", getProductsBySlug);

// router.get('/productes/:slug',
// expressAsyncHandler(async (req, res) => {
//   const{slug}=req.params;
//   const prod = await Category.findOne({slug:slug}).select("_id ");
//   if (prod) {
//     const slup= Product.find({ prod: prod._id })
//     res.status(200).json(slup);}
// })
// );
module.exports = router;
