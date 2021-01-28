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
    costToDeliver:{ 
        type: String,
    },
    readyToDispatch :{ 
        type: String,
    },
    sizeOption1: { 
        type: String,
    },
    sizeOption2: { 
        type: String,
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
    option1: { 
        type: String,
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
    offer: { type: Number },
    productPictures: [
        { img: { type: String } }
    ],
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewSchema],

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);