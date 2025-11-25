const Database = require('better-sqlite3');
const db = new Database('./data/potato.db');
module.exports = db;