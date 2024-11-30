const express = require('express');
require('express-async-errors');
require('dotenv').config();

const cors = require('cors');

const router = require('../routes/router');

const app = express();

const globalMiddleWare = require('../middleware/global');

app.use(cors());
app.use(express.json());

app.use(router);
app.use(globalMiddleWare);


const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});

module.exports = app;