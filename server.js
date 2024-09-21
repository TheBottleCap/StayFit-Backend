const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 8000

app.use(express.json());

app.listen(port, () => {
    console.log("Listening on ${port}");
})
