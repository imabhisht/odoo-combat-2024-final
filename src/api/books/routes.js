const express = require('express');
const userController = require('./controller');
const { verifyAccessToken } = require('../../middleware');
const router = express.Router();

// router.get("/",(req,res) => {
//     return res.send("Book Route!!");
// })

// router.post("/account/create", userController.createUser);

router.get("/search", verifyAccessToken ,userController.searchBooks);

router.post("/", verifyAccessToken ,userController.addBook);

router.get("/", verifyAccessToken ,userController.getBooks);

router.get("/:book_id", verifyAccessToken ,userController.getBook);

router.delete("/:book_id", verifyAccessToken ,userController.deleteBook);

router.put("/:book_id", verifyAccessToken ,userController.updateBook);

router.post("/:book_id/borrow", verifyAccessToken ,userController.borrowBook);

router.post("/:book_id/return", verifyAccessToken ,userController.returnBook);

router.get("/borrowed", verifyAccessToken ,userController.getBorrowedBooks);

router.get("/returned", verifyAccessToken ,userController.getRetunedBooks);

router.get('/book/status',verifyAccessToken, userController.getBorrowedBookByEmailAndStatus)



module.exports = router;