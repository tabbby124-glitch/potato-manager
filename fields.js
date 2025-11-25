const express=require('express');const router=express.Router();const db=require('../db');
router.get('/',(req,res)=>{res.json(db.prepare('SELECT * FROM fields ORDER BY id DESC').all());});
router.post('/',(req,res)=>{const{ name,area,variety}=req.body;const info=db.prepare('INSERT INTO fields (name,area,variety) VALUES (?,?,?)').run(name,area||0,variety||'');res.json(db.prepare('SELECT * FROM fields WHERE id=?').get(info.lastInsertRowid));});
router.delete('/:id',(req,res)=>{db.prepare('DELETE FROM fields WHERE id=?').run(req.params.id);res.json({ok:true});});
module.exports=router;