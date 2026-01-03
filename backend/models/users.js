var mongoose = require("mongoose");
var Schema = mongoose.Schema

var user = new Schema ({
    name: String,
    lastname: String,
    identificationNumber: String,
    emailAddress: String,
    password: String,
    speciality: String,
    role: {
        type: String,
        default: "user",
    },
    date: String,
   
},
{
 versionKey: false
});
module.exports = mongoose.model("Users", user);