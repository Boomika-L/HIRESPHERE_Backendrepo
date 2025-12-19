const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");





dotenv.config({ path: "./config.env" });

console.log("JWT_SECRET:", process.env.JWT_SECRET); 

const studentRoutes = require("./Routes/studentroutes");
const adminRoutes = require("./Routes/adminroutes");
const companyRoutes = require("./Routes/companyroutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/company", companyRoutes);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("DB connection failed:", err.message));

app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT_NO || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
