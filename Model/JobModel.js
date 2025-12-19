const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  location: String,
  package: String,
  status: String, 
});

module.exports = mongoose.model("Job", jobSchema);
