const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("MONGO DB PASSWORD")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB ERROR:", err));


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
    console.log("📥 Received:", req.body);
    const newClient = new Client(req.body);
    await newClient.save();

    res.json({ message: "Client data saved successfully!" });
  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});


app.get("/", (req, res) => {
  res.send("Backend working");
});

app.listen(5000, () => console.log("Server running on port 5000"));
