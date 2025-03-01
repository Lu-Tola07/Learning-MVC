const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const DB = process.env.DATABASE;
const farmRouter = require("./route/farmRouter");

const app = express();

app.use(express.json());
app.use(farmRouter);

mongoose.connect(DB).then(() => {
    console.log(`Database has successfully connected.`);
}).catch((err) => {
    console.log(`Error connecting to the database.`, err.message)
});

app.listen(PORT, () => {
    console.log(`Server is connected to PORT: ${PORT}.`)
});
