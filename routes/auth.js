const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database");

router.post("/login",(req,res)=>{

 const {usuario,password} = req.body;

 db.query(
 "SELECT * FROM usuarios WHERE usuario=?",
 [usuario],
 async(err,rows)=>{

   if(rows.length===0){
     return res.status(401).json({
       mensaje:"Usuario incorrecto"
     });
   }

   const valido = await bcrypt.compare(
     password,
     rows[0].password
   );

   if(!valido){
     return res.status(401).json({
       mensaje:"Contraseña incorrecta"
     });
   }

   const token = jwt.sign(
     {id: rows[0].id},
     process.env.JWT_SECRET,
     {expiresIn:"8h"}
   );

   res.json({
     mensaje:"Acceso correcto",
     token
   });

 });

});

module.exports = router;
