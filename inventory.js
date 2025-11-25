const express=require('express');const router=express.Router();const db=require('../db');
router.get('/',(req,res)=>{res.json(db.prepare('SELECT * FROM inventory ORDER BY id DESC').all());});
router.post('/',(req,res)=>{const{ name,qty,unit}=req.body;const info=db.prepare('INSERT INTO inventory (name,qty,unit) VALUES (?,?,?)').run(name,qty||0,unit||'');res.json(db.prepare('SELECT * FROM inventory WHERE id=?').get(info.lastInsertRowid));});
router.put('/:id',(req,res)=>{const{ qty,name,unit}=req.body;db.prepare('UPDATE inventory SET qty=?,name=?,unit=? WHERE id=?').run(qty,name,unit,req.params.id);res.json(db.prepare('SELECT * FROM inventory WHERE id=?').get(req.params.id));});
router.delete('/:id',(req,res)=>{db.prepare('DELETE FROM inventory WHERE id=?').run(req.params.id);res.json({ok:true});});
module.exports=router;