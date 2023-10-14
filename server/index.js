const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connection Successful");
}).catch((err) =>{ 
    console.log(err)
})
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.Port}`);
})