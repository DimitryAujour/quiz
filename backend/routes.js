const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database.js');

// Registration route
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            password: hashedPassword
        };
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [user.username, user.password]);
        res.status(201).send("User registered!");
    } catch {
        res.status(500).send("Failed to register user");
    }
});

// Login route
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (row) {
            if (await bcrypt.compare(password, row.password)) {
                const token = jwt.sign({ id: row.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
                res.json({ token: token });
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(404).send("User not found");
        }
    });
});

// Fetch Questions route
router.get('/questions', (req, res) => {
    // Here, I'm fetching all questions. Adjust the query if you want a specific set or limit.
    db.all("SELECT * FROM questions", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Store Score after a user completes a quiz
router.post('/score', (req, res) => {
    const userId = req.body.userId;
    const score = req.body.score;

    db.run("INSERT INTO scores (user_id, score) VALUES (?, ?)", [userId, score], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ scoreId: this.lastID });
    });
});

// Fetch Leaderboard
router.get('/leaderboard', (req, res) => {
    // Fetching top scores along with the associated username,
    // ordered by score value in descending order
    const query = `
        SELECT users.username, scores.score 
        FROM scores 
        JOIN users ON scores.user_id = users.id 
        ORDER BY score DESC 
        LIMIT 10
    `;

    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


module.exports = router;

