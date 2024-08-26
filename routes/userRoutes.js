// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route: Benutzer hinzufügen
router.post('/user', (req, res) => {
    const { name, email } = req.body;

    const userId = db.addUser(name, email);
    res.json({ id: userId, name, email });
});

// Route: Alle Benutzer abrufen
router.get('/users', (req, res) => {
    const users = db.getAllUsers();
    res.json(users);
});

module.exports = router;
