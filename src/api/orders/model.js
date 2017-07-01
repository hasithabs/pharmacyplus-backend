import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var OrderSchema = new mongoose.Schema({
  orderDate: { type: String, required: true },
  orderId: { type: Number, required: true },
  isRecived: { type: String, required: true },
  orderedItemDetails: { type: Array, required: true },
  netTotalPrice: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
OrderSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Order', OrderSchema);