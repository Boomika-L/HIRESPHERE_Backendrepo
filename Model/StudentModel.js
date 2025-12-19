const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    rollNo: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "/default-avatar.png",
    },

    role: {
      type: String,
      default: "student",
    },

    stats: {
      applications: { type: Number, default: 0 },
      interviews: { type: Number, default: 0 },
      offers: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
    },

    recentActivities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
