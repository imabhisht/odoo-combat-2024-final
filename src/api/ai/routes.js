const express = require('express');
const aiController = require('./controller');
const { verifyAccessToken } = require('../../middleware');
const router = express.Router();

router.get("/",(req,res) => {
    return res.send("AI Route!!");
});

router.post("/create",verifyAccessToken,aiController.createWebsite);

module.exports = router;
