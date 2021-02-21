const mongoose = require('mongoose');
const crouselSchema = new mongoose.Schema({

    crouselPictures: [
        { img: { type: String } }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, { timestamps: true });


module.exports = mongoose.model('Crousel', crouselSchema);