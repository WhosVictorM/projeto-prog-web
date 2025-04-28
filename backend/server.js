const express = require('express');
const cors = require('cors');
//const productsRoute = require('./routes/product.route.js');
const usersRoute = require('./routes/user.route.js');
const pool = require('./config/db'); // Importar a configuração do banco de dados

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use("/api/products", productsRoute);
app.use("/api/auth", usersRoute);

pool.connect()
    .then(() => {
        console.log('PostgreSQL Connected.');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}.`);
        });
    })
    .catch(err => {
        console.error('Connection error', err.stack);
    });