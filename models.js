const db = require('./db');
db.prepare(`CREATE TABLE IF NOT EXISTS fields (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,area REAL DEFAULT 0,variety TEXT DEFAULT '');`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,qty REAL DEFAULT 0,unit TEXT DEFAULT '');`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS operations (id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT NOT NULL,field_id INTEGER,season TEXT,type TEXT,worker TEXT,area REAL,notes TEXT,FOREIGN KEY(field_id) REFERENCES fields(id));`).run();
module.exports = { db };