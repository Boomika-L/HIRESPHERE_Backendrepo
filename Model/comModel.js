const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String },
  industry: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Company", companySchema);
