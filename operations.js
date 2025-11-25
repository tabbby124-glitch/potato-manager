const express=require('express');const router=express.Router();const db=require('../db');
router.get('/',(req,res)=>{res.json(db.prepare(`SELECT o.*, f.name as field_name FROM operations o LEFT JOIN fields f ON f.id=o.field_id ORDER BY date DESC,id DESC`).all());});
router.post('/',(req,res)=>{const{ date,field_id,season,type,worker,area,notes}=req.body;const info=db.prepare('INSERT INTO operations (date,field_id,season,type,worker,area,notes) VALUES (?,?,?,?,?,?,?)').run(date,field_id||null,season||'',type||'',worker||'',area||0,notes||'');res.json(db.prepare('SELECT * FROM operations WHERE id=?').get(info.lastInsertRowid));});
router.delete('/:id',(req,res)=>{db.prepare('DELETE FROM operations WHERE id=?').run(req.params.id);res.json({ok:true});});
module.exports=router;