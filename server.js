const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/clientDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const clientSchema = new mongoose.Schema({
  clientName: String,
  pan: String,
  gstin: String,
  email: String,
  mobile: String
});

const Client = mongoose.model("Client", clientSchema);

app.post("/api/client", async (req, res) => {
  try {
    console.log("📥 Received body:", req.body);

    const newClient = new Client(req.body);
    await newClient.save();

    res.json({ message: "Client data saved successfully!" });

  } catch (error) {
    console.log("❌ SERVER ERROR:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});

// GET - View all clients
app.get("/api/client", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
