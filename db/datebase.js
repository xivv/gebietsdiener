const Database = require('better-sqlite3');
const db = new Database('my-database.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

function addUser(username, password) {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = stmt.run(username, password);
    return info.lastInsertRowid;
}

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
