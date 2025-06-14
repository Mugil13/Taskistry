const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5002;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/tododb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", taskRoutes);

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
