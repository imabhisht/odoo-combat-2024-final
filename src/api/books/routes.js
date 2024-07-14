const express = require('express');
const userController = require('./controller');
const { verifyAccessToken } = require('../../middleware');
const router = express.Router();

// router.get("/",(req,res) => {
//     return res.send("Book Route!!");
// })

// router.post("/account/create", userController.createUser);

router.post("/", verifyAccessToken ,userController.addBook);

router.get("/", verifyAccessToken ,userController.getBooks);

router.get("/:book_id", verifyAccessToken ,userController.getBook);

router.delete("/:book_id", verifyAccessToken ,userController.deleteBook);

router.put("/:book_id", verifyAccessToken ,userController.updateBook);

module.exports = router;