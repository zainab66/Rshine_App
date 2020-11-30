const express = require('express');
const router = express.Router();
const data = require('../data');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(data.products);
});

module.exports = router;
