// const mysql = require("mysql2"); //a retirer
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// const mongo_URI = process.env.MONGO_URI;
const MONGO_HOST = process.env.MONGO_HOST;


  // Connect to MongoDB (replace the URL with your own MongoDB URL)
// Connect to MongoDB (replace the URL with your own MongoDB URL)
mongoose
  .connect(`mongodb://admin:admin@mongodb:27017/myregistrationdb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.error(`Failed with error : ${e}`));


// Define the schema for the collection
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dateOfBirth: String,
  city: String,
  postalCode: String,
});



// Definir le model
const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth:req.body.dateOfBirth,
    city: req.body.city,
    postalCode: req.body.postalCode,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Route to create a new user
app.post("/add", async (req, res) => {
  console.log("formData", req.body)
  console.log("formData", req.body.firstName)

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    city: req.body.city,
    postalCode: req.body.postalCode,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    const mappedUsers = users.map((u) => ({ id: u._id, ...u._doc }));
    res.json(mappedUsers);
    console.log("mappedUsers",mappedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { "api-key": apiKey } = req.headers;

  if (!apiKey) return res.status(401).json({ error: "Not authenticated" });

  if (apiKey !== "delete")
    return res.status(403).json({ error: "Not autorized" });

  try {
    const deletedDocument = await User.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }
    res
      .status(204)
      .json({ message: "Document deleted successfully", deletedDocument });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(port, () => {
  console.log(`server running on port ${port}`);
});