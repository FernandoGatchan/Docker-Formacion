const express = require('express');
const pg = require('pg');
const app = express();
const PORT = 3000;

const pool = new pg.Pool({
    user: 'user',
    host: 'db',
    database: 'mydatabase',
    password: 'password',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`¡Hola, Docker! Hora actual en la base de datos: ${result.rows[0].now}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al conectar con la base de datos');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});