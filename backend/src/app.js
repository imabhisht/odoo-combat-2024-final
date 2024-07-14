require("./init/logger")
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verifyAccessToken } = require("./middleware/auth")
const { firebase_admin, logger } = require("./init");
const app = express();
// const { projectCreatorConsumer } = require("./api/ai/consumer.js");
const { bookOnKafkaConsumer } = require("./api/books/controller")
//Load Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

// Start Kafka Consumer
// projectCreatorConsumer();
bookOnKafkaConsumer();
app.get("/",async(req,res)=>{
    res.send("Ok")
})

app.get("/getuser", verifyAccessToken, async(req,res)=>{
    const { id } = req.auth;
    const user = await firebase_admin.auth().getUser(id);
    res.send(user);
});

// Routes
app.use("/user",require("./api/user/routes"));
app.use("/ai",require("./api/ai/routes"));
app.use("/project",require("./api/project/routes"));
app.use("/book", require("./api/books/routes"))


module.exports = app;