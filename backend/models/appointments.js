var mongoose = require("mongoose");
var Schema = mongoose.Schema

var appointments = new Schema ({
    name: String,
    lastname: String,
    identificationType: String,
    identificationNumber: String,
    dateBirth: String,
    phoneNumber: String,
    emailAddress: String,
    location: String,
    speciality: String,
    dateAppointment: String,
    timeAppointment: String,
    description: String
},
{
 versionKey: false
});
module.exports = mongoose.model("Appointments", appointments);