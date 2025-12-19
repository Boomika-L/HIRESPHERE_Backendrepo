const Student = require("../Model/StudentModel");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
  try {
    const { name, rollNo, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({
      name,
      rollNo,
      email,
      password, 
      avatar: "https://i.pravatar.cc/150",
    });

    res.status(201).json({
      message: "Student registered",
      student: { id: student._id, name: student.name, email: student.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "No student exists" });

    if (student.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentDashboard = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const student = await Student.findOne({ email }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password"); // exclude password
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, rollNo, email, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

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
