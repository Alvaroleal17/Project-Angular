const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//Configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Mongoose
mongoose
  .connect(process.env.STRING_CONEXION)
  .then((db) => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err);
  });

//Modelos
const User = require("./models/usuarios.js");
const Citas = require("./models/citas.js");
const incapacidades = require("./models/incapacidades.js");

//Rutas

//Usuarios
app.get("/usuarios", async (req, res) => {
  const u = await User.find();
  res.status(200).send(u);
});

app.get("/doctores", async (req, res) => {
  const u = await User.find();
  res.status(200).send(u);
});

//Register
app.post("/registro", async (req, res) => {
  const { nombre, apellido, correo, documento, password, especialidad, role } =
    req.body;
  const u = {
    nombre: nombre,
    apellido: apellido,
    documento: documento,
    correo: correo,
    password: password,
    especialidad: especialidad,
    role: role,
    date: new Date(),
  };
  const usuario = new User(u);
  await usuario.save();
  const token = jwt.sign({ _id: usuario._id }, "secretKey");
  res.status(200).json({ token });
});

//Login
app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  const user = await User.findOne({ correo });
  if (!user) return res.status(401).send("Este correo no existe");
  if (user.password !== password)
    return res.status(401).send("Contraseña incorrecta");

  const token = jwt.sign({ _id: user._id }, "secretKey");
  return res.status(200).json({ token });
});

app.get("/role/:correo", async function (req, res) {
  const email = req.params.correo;
  const usuario = await User.findOne({ correo: email });
  res.send({ role: usuario.role });
});

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauhtorized Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("Unauhtorized Request");
    }

    const payload = await jwt.verify(token, "secretKey");
    if (!payload) {
      return res.status(401).send("Unauhtorized Request");
    }
    req.userId = payload._id;
    next();
  } catch (e) {
    return res.status(401).send("Unauhtorized Request");
  }
}

/* ----------------------- citas ----------------------------- */

// obtener citas
app.get("/citas", async (req, res) => {
  const cita = await Citas.find();
  res.status(200).send(cita);
});

// Agendar Citas

app.post("/registrarcita", async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      iden,
      cc,
      nacimiento,
      telefono,
      email,
      departamento,
      especialidad,
      fecha,
      time,
      descripcion,
    } = req.body;

    const u = {
      nombres: nombres,
      apellidos: apellidos,
      iden: iden,
      cc: cc,
      nacimiento: nacimiento,
      telefono: telefono,
      email: email,
      departamento: departamento,
      especialidad: especialidad,
      fecha: fecha,
      time: time,
      descripcion: descripcion,
      date: new Date()
    };

    const cita = new Citas(u);
    await cita.save();
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
});

// actualizar la cita

app.put("/editarcita/:id", async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      iden,
      cc,
      nacimiento,
      telefono,
      email,
      departamento,
      especialidad,
      fecha,
      time,
      descripcion,
    } = req.body;
    let cita = await Citas.findById(req.params.id);
    if (!cita) {
      res.status(404).json({ msg: "no existe la cita" });
    }
    (cita.nombres = nombres),
      (cita.apellidos = apellidos),
      (cita.iden = iden),
      (cita.cc = cc),
      (cita.nacimiento = nacimiento),
      (cita.telefono = telefono),
      (cita.email = email),
      (cita.departamento = departamento),
      (cita.especialidad = especialidad),
      (cita.fecha = fecha),
      (cita.time = time),
      (cita.descripcion = descripcion);

    cita = await Citas.findByIdAndUpdate({ _id: req.params.id }, cita, {
      new: true,
    });
    res.json(cita);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
});

// obtener la cita por id

app.get("/obtenercita/:id", async (req, res) => {
  try {
    let cita = await Citas.findById(req.params.id);
    if (!cita) {
      res.status(404).json({ msg: "no existe la cita" });
    }

    res.json(cita);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
});

//borrar cita

app.delete("/borrarcita/:id", async (req, res) => {
  try {
    let cita = await Citas.findById(req.params.id);
    console.log(cita);
    if (!cita) {
      res.status(404).json({ msg: "no existe la cita" });
    }
    await Citas.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Cita eliminada con exito!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
});

/* ----------------------- Incapacidades ----------------------------- */

app.get("/incapacidad", async (req,res) => {
const incapacidad = await incapacidades.find();
res.status(200).send(incapacidad)
});

app.post("/registrarincapacidad", async (req,res) => {
  try{
    const { documento, numberDoc, nombres, apellidos, correo, incapacidad, dias, tipo } = req.body;

    const i = {
    documento: documento,
    numberDoc: numberDoc,
    nombres: nombres,
    apellidos: apellidos,
    correo: correo,
    incapacidad: incapacidad,
    dias: dias,
    tipo: tipo,
    date: new Date(),
    }

    const inability = new incapacidades(i);
    await inability.save();

  }catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
});


//Listen
app.listen(3000, () => {
  console.log("Servidor Iniciado");
});
