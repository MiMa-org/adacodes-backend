const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["events", "groups", "jobs", "learning", "support", "others"] },
  street: { type: String },
  streetNr: { type: String },
  complement: { type: String },
  zip: { type: String },
  website: { type: String },
  email: { type: String },
  phone: { type: String },
  description: { type: String, required: true },
  picture: { type: String },
  isApproved: { type: Boolean, default: false },
  latitude: { type: Number },
  longitude: { type: Number },
  date: { type: String },
  time: { type: String }
});
 
module.exports = model("Service", serviceSchema);