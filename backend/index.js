const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Mongoose Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/BD_FinalProyect")
  .then(() => console.log("Connected Successfully to the DB"))
  .catch((err) => console.log(err + " Error in order to connect to the DB!"));

// Models
const User = require("./models/users.js");
const SickLeave = require("./models/sickLeaves.js");
const Appointment = require("./models/appointments.js");

/* ----------------------- User Routes ----------------------------- */

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

app.post("/signUp", async (req, res) => {
  try {
    const { names, lastnames, emailAddress, identificationNumber, password, speciality, role } = req.body;
    
    const newUser = new User({
      names,
      lastnames,
      identificationNumber,
      emailAddress,
      password,
      speciality,
      role,
      date: new Date(),
    });

    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, "secretKey");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Error during sign up");
  }
});

app.get("/role/:emailAddress", async function (req, res) {
  try {
    const email = req.params.emailAddress; 
    
    const foundUser = await User.findOne({ emailAddress: email });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ role: foundUser.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const foundUser = await User.findOne({ emailAddress });

    if (!foundUser) return res.status(401).send("This email address does not exist");
    if (foundUser.password !== password) return res.status(401).send("Incorrect password");

    const token = jwt.sign({ _id: foundUser._id }, "secretKey");
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

/* ----------------------- Appointment Routes ----------------------------- */


app.get("/appointments", async (req, res) => {
  try {
    const { email } = req.query; // Look for the email

    let filter = {};
    if (email) {
      filter = {emailAddress: email}; // Filter by the existing email 
    }

    const allAppointments = await Appointment.find(filter); 
    res.status(200).send(allAppointments);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error retrieving appointments");
  }
});

app.post("/registerAppointment", async (req, res) => {
  try {
    const data = req.body;
    const newAppointment = new Appointment({
      ...data,
      date: new Date()
    });
    await newAppointment.save();
    res.status(200).send({ msg: "Appointment saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error saving the appointment");
  }
});

app.delete("/deleteAppointment/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "The appointment was successfully deleted!!" });
  } catch (error) {
    res.status(500).send("Error deleting appointment");
  }
});

/* ----------------------- Sick Leave Routes ----------------------------- */

app.post("/registerSickLeave", async (req, res) => {
  try {
    const data = req.body;
    const newLeave = new SickLeave({
      ...data,
      dateSickLeave: new Date(),
    });
    await newLeave.save();
    res.status(200).send({ msg: "Sick leave registered" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating the sick leave data");
  }
});

// Server Start
app.listen(3000, () => {
  console.log("The server has been started, listening port 3000");
});