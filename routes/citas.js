const express = require("express");
const router = express.Router();

const db = require("../database");


// OBTENER
router.get("/",(req,res)=>{

 const sql = `
 SELECT citas.id,
 pacientes.nombre,
 citas.fecha,
 citas.hora,
 citas.observaciones
 FROM citas
 INNER JOIN pacientes
 ON citas.paciente_id = pacientes.id
 `;

 db.query(sql,(err,rows)=>{
   res.json(rows);
 });

});


// CREAR
router.post("/",(req,res)=>{

 const {
   paciente_id,
   fecha,
   hora,
   observaciones
 } = req.body;

 // VALIDAR DUPLICADOS
 db.query(
 `
 SELECT * FROM citas
 WHERE fecha=? AND hora=?
 `,
 [fecha,hora],
 (err,rows)=>{

   if(rows.length>0){
     return res.status(400).json({
       mensaje:"Horario ocupado"
     });
   }

   db.query(
   `
   INSERT INTO citas
   (paciente_id,fecha,hora,observaciones)
   VALUES(?,?,?,?)
   `,
   [paciente_id,fecha,hora,observaciones],
   ()=>{
     res.json({
       mensaje:"Cita creada"
     });
   });

 });

});


// ELIMINAR
router.delete("/:id",(req,res)=>{

 db.query(
 "DELETE FROM citas WHERE id=?",
 [req.params.id],
 ()=>{
   res.json({
     mensaje:"Cita eliminada"
   });
 });

});

module.exports = router;
