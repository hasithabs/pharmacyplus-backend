import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var DrugSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: Object, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  remarks: { type: String },
  dangerlevel: { type: Number, required: true },
  reorderlevel: { type: Number, required: true },
  weight: { type: String, required: true },
  // dosage: { type: Object, required: true },
  // frequency: { type: Object, required: true },
  created_at: Date,
  updated_at: Date
}, { versionKey: false });

// on every save, add the date
DrugSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Drug', DrugSchema);