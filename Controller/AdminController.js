const Student = require("../Model/StudentModel");
const Admin = require("../Model/Adminmodel");
const jwt = require("jsonwebtoken");
const Company = require("../Model/CompanyModel");

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const admin = await Admin.create({
      name,
      email,
      password, 
    });

    res.status(201).json({ message: "Admin registered", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const { email } = req.query; 
    if (!email) return res.status(400).json({ message: "Email is required" });

    const admin = await Admin.findOne({ email }).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, rollNo, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ message: "Student already exists" });

    const student = await Student.create({
      name,
      rollNo,
      email,
      password, 
      avatar: "https://i.pravatar.cc/150", 
      stats: { applications: 0, interviews: 0, offers: 0, pending: 0 },
    });

    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addCompany = async (req, res) => {
  try {
    const { name, email, website } = req.body;

    const existing = await Company.findOne({ email });
    if (existing) return res.status(400).json({ message: "Company already exists" });

    const company = await Company.create({ name, email, website });

    res.status(201).json({ message: "Company added successfully", company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
