// routes/userRoutes.js (oder eine andere Route)
const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {rename} = require("fs");
const upload = multer({dest: 'uploads/'});
const {close} = require("../db/datebase")
const authenticateToken = require("../middleware/jwtSecurityMiddleware");

// Route für den Download der SQLite-Datenbank
router.get('/', authenticateToken, (req, res) => {
    const dbPath = path.join(__dirname, '../my-database.db');
    console.log(dbPath);
    res.download(dbPath, 'my-database.db', (err) => {
        if (err) {
            console.error('Fehler beim Herunterladen der Datenbank:', err);
            res.status(500).send('Fehler beim Herunterladen der Datenbank.');
        }
    });
});

router.post('/', authenticateToken, upload.single('database'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Keine Datei hochgeladen.');
    }
    close();
    rename(req.file.path, 'my-database.db', (err) => {
        if (err) {
            console.error('Fehler beim Verschieben der Datei:', err);
            return res.status(500).send('Fehler beim Speichern der Datei.');
        }
        res.send('Datei erfolgreich hochgeladen und überschrieben.');
    });
});

module.exports = router;