var mongoose = require("mongoose");
var Schema = mongoose.Schema

var usuario = new Schema ({
    nombre: String,
    apellido: String,
    documento: String,
    correo: String,
    password: String,
    especialidad: String,
    role: {
        type: String,
        default: "user",
    },
    date: String,
   
},
{
 versionKey: false
});
module.exports = mongoose.model("Usuarios", usuario);