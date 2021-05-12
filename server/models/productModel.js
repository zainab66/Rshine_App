const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );




const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    discountPrice: { 
        type: Number, 
    },
    madeBy: { 
        type: String, 
    },
    material: { 
        type: String, 
    },
    standardDelivery:{ 
        type: Number,
    },
    expressDelivery:{ 
        type: Number,
    },
    readyToDispatchRange:{ 
        type: String,
    },
    readyToDispatchDaysOrWeeks:{ 
        type: String,
    },
    size1: { 
        type: String,
    },
    priceSize1: { 
        type: Number,
    },
    size2: { 
        type: String,
    },
    priceSize2: { 
        type: Number,
    },
    color1: { 
        type: String,
    },
    color2: { 
        type: String,
    },
    color3: { 
        type: String,
    },
    color4: { 
        type: String,
    },
    option1: { 
        type: String,
    },
    priceOption1: { 
        type: Number,
    },
    size1_Option1: { 
        type: String,
    },
    priceSize1_Option1: { 
        type: Number,
    },
    size2_Option1: { 
        type: String,
    },
    priceSize2_Option1: { 
        type: Number,
    },
    option2: { 
        type: String,
    },
    priceOption2: { 
        type: Number,
    },
    size1_Option2: { 
        type: String,
    },
    priceSize1_Option2: { 
        type: Number,
    },
    size2_Option2: { 
        type: String,
    },
    priceSize2_Option2: { 
        type: Number,
    },
    option3: { 
        type: String,
    },
    option4: { 
        type: String,
    },
    option5: { 
        type: String,
    },
    option6: { 
        type: String,
    },
    option7: { 
        type: String,
    },
    option8: { 
        type: String,
    },
    option9: { 
        type: String,
    },
    option10: { 
        type: String,
    },
    
    countInStock: { type: Number, required: true },

    description: {
        type: String,
        required: true,
        trim: true
    },
    addYourPersonalisation: {
        type: String,
        required: true,
        trim: true
    },
    offer: { type: Number },
    productPictures: [
        { img: { type: String } }
    ],
   // rating: { type: Number },
  //  numReviews: { type: Number },
    reviews: [reviewSchema],

    category: { type:String, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);