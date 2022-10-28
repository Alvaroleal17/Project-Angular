var mongoose = require("mongoose");
var Schema = mongoose.Schema

var citas = new Schema ({
    nombres: String,
    apellidos: String,
    iden: String,
    cc: String,
    nacimiento: String,
    telefono: String,
    email: String,
    departamento: String,
    especialidad: String,
    fecha: String,
    time: String,
    descripcion: String
},
{
 versionKey: false
});
module.exports = mongoose.model("Citas", citas);