const path = require('path');
const express = require('express');
const app = express();

// Middlewares
app.use(express.json()) // Comunicacion con json

// Direccion a directorio public
app.use(express.static(path.join(__dirname, 'public')));

// Aquí las rutas (listar, ver, crear, eliminar)


app.listen(3000, () => {console.log("Listen on port 3000");});