var mongoose = require("mongoose");
var Schema = mongoose.Schema

var incapacidades = new Schema ({
    documento: String,
    numberDoc: String,
    nombres: String,
    apellidos: String,
    correo: String,
    incapacidad: String,
    dias: String,
    tipo: String,
    date: String
},
{
 versionKey: false
});
module.exports = mongoose.model("Incapacidades", incapacidades);