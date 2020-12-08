const express = require('express');
const router = express.Router();
const data = require('../data.js');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel.js');
const authorize = require("../middleware/authorize")
const isAdmin = require("../middleware/adminAuthorize")

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

router.get('/:id',
expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})
);


router.post('/', authorize, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'samle name ' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);








module.exports = router;
