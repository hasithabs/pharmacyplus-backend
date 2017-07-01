import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var batchSchema = new mongoose.Schema({
  batch_Id:{type:Number,required:true, unique: true},

  stock_Id:{type:Number,required:true},

  drug_category:{type:String,required:true},

  drug_name:{type:String,required:true},

  quantity:{type:Number,required:true},

  manufacture_date:{type:Date,required:true},

  expired_date:{type:Date,required:true},

  issue_no:{type:Number,required:true},

  created_at: Date,

  updated_at: Date
});

// on every save, add the date
batchSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Batch', batchSchema);
