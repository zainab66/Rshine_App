const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            qty: { type: Number, default: 1 },
            price: { type: Number},
            message:{type: String},
            option:{type: String},
            colorOption:{type: String},
            sizeOption:{type: String},
            sizeFirstOption:{type: String},
            sizeSecondOption:{type: String},
            dentify:{type: String},
            name:{type: String},
            img:{type: String},
            countInStock: { type: Number}

        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);