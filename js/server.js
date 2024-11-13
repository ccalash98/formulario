const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Configura la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

app.use(bodyParser.json());

app.post("/registrar", async (req, res) => {
    const {
        titular,
        correo,
        telefono,
        abonado,
        dni,
        ruc,
        nombreEmpresa,
    } = req.body;

    try {
        const query = `
            INSERT INTO registros (titular, correo, telefono, abonado, dni, ruc, nombre_empresa)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;
        const values = [titular, correo, telefono, abonado, dni, ruc, nombreEmpresa];
        const result = await pool.query(query, values);

        res.status(201).json({ message: "Registro exitoso", data: result.rows[0] });
    } catch (error) {
        console.error("Error al registrar:", error);
        res.status(500).json({ message: "Error al registrar en la base de datos" });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
