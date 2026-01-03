var mongoose = require("mongoose");
var Schema = mongoose.Schema

var sickLeave = new Schema ({
    identificationType: String,
    identificationNumber: String,
    name: String,
    lastname: String,
    emailAddress: String,
    sickLeave: String,
    daysLeave: String,
    typeSickLeave: String,
    date: String
},
{
 versionKey: false
});
module.exports = mongoose.model("Sick Leave", sickLeave);