const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  stats: {
    totalStudents: { type: Number, default: 0 },
    totalCompanies: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
    totalApplications: { type: Number, default: 0 },
    offersReleased: { type: Number, default: 0 },
    pendingApplications: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Admin", adminSchema);
