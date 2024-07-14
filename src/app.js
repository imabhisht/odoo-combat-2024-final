require("./init/logger")
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { firebase_admin, logger } = require("./init");
const app = express();
// const { projectCreatorConsumer } = require("./api/ai/consumer.js");

//Load Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

// Start Kafka Consumer
// projectCreatorConsumer();

app.get("/",async(req,res)=>{
    res.send("Ok")
})

// Routes
app.use("/user",require("./api/user/routes"));
app.use("/ai",require("./api/ai/routes"));
app.use("/project",require("./api/project/routes"));


module.exports = app;