const Product = require('../models/productModel.js');
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require('../models/categoryModel.js');




exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
      .select("_id type")
      .exec((error, category) => {
        if (error) {
          return res.status(400).json({ error });
        }
  
        if (category) {
          Product.find({ category: category._id }).exec((error, produ) => {
            if (error) {
              return res.status(400).json({ error });
            }
  
            if (category.type) {
              if (produ.length > 0) {
                res.status(200).json({
                  produ
                });
              }
            } else {
              res.status(200).json({ produ });
            }
          });
        }
      });
  };
  