import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var PrescriptionTimesSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Prescriptiontimes', PrescriptionTimesSchema);