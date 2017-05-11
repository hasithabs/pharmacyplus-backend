import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var ProductSchema = new mongoose.Schema({
  prod_name: { type: String, required: true },
  prod_desc: String,
  prod_price: { type: Number, required: true },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
ProductSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Product', ProductSchema);