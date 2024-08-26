// db/index.js
const Database = require('better-sqlite3');
const db = new Database('my-database.db');

// Beispiel: Tabelle erstellen (nur einmal ausführen)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// Funktion zum Hinzufügen eines Benutzers
function addUser(name, email) {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const info = stmt.run(name, email);
    return info.lastInsertRowid;
}

// Funktion zum Abrufen aller Benutzer
function getAllUsers() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
}

function close() {
    db.close();
}

module.exports = {
    addUser,
    getAllUsers,
    close
};
