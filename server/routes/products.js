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
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

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

const s3 = new aws.S3({
  accessKeyId: (process.env.accessKeyId),
  secretAccessKey: (process.env.secretAccessKey),
})

const upload = multer({ storage });
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'rshine-test',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
})




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


router.post('/create', authorize, isAdmin, uploadS3.array('productPictures'), expressAsyncHandler(async (req, res) => {
  const {name,price,discountPrice,sizeOption1,priceSizeOption1,sizeOption2,priceSizeOption2, colorOption1, colorOption2, colorOption3, colorOption4,firstOption,priceFirstOption,sizefirstOption1, priceSizefirstOption1,sizefirstOption2, priceSizefirstOption2,option2,option3,option4,option5,option6,option7,option8,option9,option10,
    description,addYourPersonalisation,category,countInStock,madeBy,material, standardDelivery,expressDelivery, readyToDispatchRange,readyToDispatchDaysOrWeeks ,rating,numReviews,createdBy} = req.body;
  let productPictures = [];
  if(req.files.length > 0){
    productPictures = req.files.map(file => {
      return {img: file.location}
    });
  }
  const newProduct = new Product({
    name: name,
    slug : slugify(name),
    price,
    discountPrice,
    sizeOption1,
    priceSizeOption1,
    sizeOption2,
    priceSizeOption2,
    colorOption1,
    colorOption2,
    colorOption3,
    colorOption4,
    firstOption,
    priceFirstOption,
    sizefirstOption1,
    priceSizefirstOption1,
    sizefirstOption2,
    priceSizefirstOption2,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    option9,
    option10,
    description,
    addYourPersonalisation,
    productPictures,
    category,
    countInStock,
    madeBy,
    material,
    standardDelivery,
    expressDelivery,
    readyToDispatchRange ,
    readyToDispatchDaysOrWeeks,
    rating,
    numReviews,
    createdBy: req.user._id,
  });
  const createdProduct = await newProduct.save();
  //res.send({ message: 'Product Created', product: createdProduct });
  res.status(200).json({ file: req.files, body:req.body});
})
);



// router.put('/:id', authorize, isAdmin, expressAsyncHandler(async (req, res) => {
//   const productId = req.params.id;
//   const product = await Product.findById(productId);
//   if (product) {
//     product.name = req.body.name;
//     product.price = req.body.price;
//     product.image = req.body.image;
//     product.category = req.body.category;
//     product.brand = req.body.brand;
//     product.countInStock = req.body.countInStock;
//     product.description = req.body.description;
//     const updatedProduct = await product.save();
//     res.send({ message: 'Product Updated', product: updatedProduct });
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// })
// );

router.get("/productes/:slug", getProductsBySlug);

router.post('/:id/reviews', authorize, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);




router.delete(
  '/:id',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);







module.exports = router;
