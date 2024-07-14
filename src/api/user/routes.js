const express = require('express');
const userController = require('./controllers');
const { verifyAccessToken } = require('../../middleware');
const router = express.Router();

router.get("/",(req,res) => {
    return res.send("User Route!!");
})

// router.post("/account/create", userController.createUser);

router.delete("/account", verifyAccessToken ,userController.deleteUser);



router.post("/login", userController.singleLogin);

router.post("/token/refresh", userController.refreshToken);

module.exports = router;