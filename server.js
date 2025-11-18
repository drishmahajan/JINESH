const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas
mongoose.connect("mongodb+srv://drishmahajan:mahajan12345@cluster0.bw9xzbi.mongodb.net/clientDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB ERROR:", err));

// Schema
const clientSchema = new mongoose.Schema({
  clientName: String,
  pan: String,
  gstin: String,
  email: String,
  mobile: String
});

const Client = mongoose.model("Client", clientSchema);

// POST - save data
app.post("/api/client", async (req, res) => {
  try {
    console.log("📥 Received:", req.body);
    const newClient = new Client(req.body);
    await newClient.save();

    res.json({ message: "Client data saved successfully!" });
  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});

// GET - check backend
app.get("/", (req, res) => {
  res.send("Backend working");
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
