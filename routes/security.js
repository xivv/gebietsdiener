const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {getAllUsers, addUser} = require("../db/datebase");
const authenticateToken = require("../middleware/jwtSecurityMiddleware");
const router = express.Router();

router.post('/register', authenticateToken, async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    addUser(username, hashedPassword);

    res.status(201).send(`Benutzer ${username} erfolgreich registriert.`);
});

router.post('/', async (req, res) => {

    const { username, password } = req.body;
    const users = getAllUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('Benutzer nicht gefunden.');
    }

    // Passwort überprüfen
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Ungültiges Passwort.');
    }

    // JWT generieren
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;