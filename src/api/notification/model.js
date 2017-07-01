import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

var NotificationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  stock: { type: Object, required: true },
  seen: { type: Boolean, required: true, default: false }
}, { versionKey: false });

module.exports = mongoose.model('Notification', NotificationSchema);