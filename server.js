require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const pacientesRoutes = require("./routes/pacientes");
const citasRoutes = require("./routes/citas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/citas", citasRoutes);

app.listen(process.env.PORT, ()=>{
 console.log("Servidor corriendo");
});
