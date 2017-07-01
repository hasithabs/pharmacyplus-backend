import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var PrescriptionSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  prescriptionId: { type: Number, required: true },
  patientName: { type: String, required: true },
  isIssued: { type: String, required: true },
  medDuration: { type: Array, required: true },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
PrescriptionSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);