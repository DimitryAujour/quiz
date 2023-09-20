const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./quizApp.db');

// Create users table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

    // Create questions table
    db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY,
    question_text TEXT NOT NULL,
    answer TEXT NOT NULL,
    choices TEXT NOT NULL
  )`);

    // Create scores table
    db.run(`CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    score INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
