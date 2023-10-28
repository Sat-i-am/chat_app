    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const userRoutes = require("./routes/userRoutes")
    const messageRoute = require("./routes/messagesRoute");
   

    const app = express();
    require("dotenv").config();

    app.use(cors());
    app.use(express.json()); 
    
    app.use("/api/auth", userRoutes);
    app.use("/api/messages", messageRoute);
 
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DB Connection Successful");
    }).catch((err) =>{ 
        console.log(err)
    })

    const server = app.listen(process.env.PORT, () => {
        console.log(`Server Started on Port ${process.env.Port}`);
    })

    