const express = require('express');
const router = express.Router();
const data = require('../data');

/* GET products listing. */
router.get('/', function(req, res) {
  res.send(data.products);
});

router.get('/:id', function(req, res) {
  const product = data.products.find(x => x._id === req.params.id);
  if(product){
    res.send(product);
  }else {
    res.status(404).send({message:'Product not Found'});
  }
});

module.exports = router;
