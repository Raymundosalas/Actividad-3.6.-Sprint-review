const express = require("express");
const router = express.Router();

const db = require("../database");


// OBTENER
router.get("/",(req,res)=>{

 db.query(
 "SELECT * FROM pacientes",
 (err,rows)=>{
   res.json(rows);
 });

});


// CREAR
router.post("/",(req,res)=>{

 const {nombre,telefono,correo}=req.body;

 db.query(
 `
 INSERT INTO pacientes(nombre,telefono,correo)
 VALUES(?,?,?)
 `,
 [nombre,telefono,correo],
 ()=>{
   res.json({
     mensaje:"Paciente agregado"
   });
 });

});


// ELIMINAR
router.delete("/:id",(req,res)=>{

 db.query(
 "DELETE FROM pacientes WHERE id=?",
 [req.params.id],
 ()=>{
   res.json({
     mensaje:"Paciente eliminado"
   });
 });

});

module.exports = router;
