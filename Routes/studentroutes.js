const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  getStudentDashboard,
} = require("../Controller/StudentController"); 


router.post("/register", registerStudent);

router.post("/login", loginStudent);

router.get("/dashboard", getStudentDashboard);

module.exports = router;
