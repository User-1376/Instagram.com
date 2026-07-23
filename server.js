const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión y creación de la base de datos SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// Endpoint para recibir los datos del formulario
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error al guardar en la base de datos' });
        }
        res.status(200).json({ message: 'Usuario guardado con éxito', id: this.lastID });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});