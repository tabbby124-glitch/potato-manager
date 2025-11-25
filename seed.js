const db=require('./db');
db.prepare(`INSERT INTO fields (name,area,variety) VALUES ('حقل 1',30,'أريزونا')`).run();
db.prepare(`INSERT INTO fields (name,area,variety) VALUES ('حقل 2',62,'أريزونا')`).run();
db.prepare(`INSERT INTO inventory (name,qty,unit) VALUES ('بذور - أريزونا',2666,'kg')`).run();
db.prepare(`INSERT INTO inventory (name,qty,unit) VALUES ('نترات أمونيوم',500,'kg')`).run();
console.log('Seeded sample data.');