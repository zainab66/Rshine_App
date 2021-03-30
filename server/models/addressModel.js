const mongoose = require("mongoose");



const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  province: { type: String, required: true },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});
const userAddressSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  address: [addressSchema]
}, { timestamps: true });

mongoose.model("Address", addressSchema);
 module.exports = mongoose.model('UserAddress', userAddressSchema);
