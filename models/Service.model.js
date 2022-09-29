const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["events", "groups", "jobs", "learning", "support", "others"] },
  street: { type: String },
  streetNr: { type: Number },
  complement: { type: String },
  zip: { type: Number },
  website: { type: String },
  email: { type: String },
  phone: { type: Number },
  description: { type: String, required: true },
  picture: { type: String },
});
 
module.exports = model("Service", serviceSchema);