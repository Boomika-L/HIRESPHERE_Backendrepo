const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
  getAllStudents,
  addStudent,
  getAllCompanies,
  addCompany,
} = require("../Controller/AdminController");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", getAdminDashboard);

router.get("/students", getAllStudents);
router.post("/students", addStudent);

router.get("/companies", getAllCompanies);
router.post("/companies", addCompany);

module.exports = router;
