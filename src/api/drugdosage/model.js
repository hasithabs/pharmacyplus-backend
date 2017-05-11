import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var DrugdosageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Drugdosage', DrugdosageSchema);