const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "database", "users.db"),
    (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("✅ SQLite Connected");
        }
    }
);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);
});

module.exports = db;