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
    sizeOption1: { 
        type: String,
    },
    priceSizeOption1: { 
        type: Number,
    },
    sizeOption2: { 
        type: String,
    },
    priceSizeOption2: { 
        type: Number,
    },
    colorOption1: { 
        type: String,
    },
    colorOption2: { 
        type: String,
    },
    colorOption3: { 
        type: String,
    },
    colorOption4: { 
        type: String,
    },
    firstOption: { 
        type: String,
    },
    priceFirstOption: { 
        type: Number,
    },
    sizefirstOption1: { 
        type: String,
    },
    priceSizefirstOption1: { 
        type: Number,
    },
    sizefirstOption2: { 
        type: String,
    },
    priceSizefirstOption2: { 
        type: Number,
    },
    option2: { 
        type: String,
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
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewSchema],

    category: { type:String, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);