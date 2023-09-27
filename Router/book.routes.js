const express = require("express");
const { BOOKData_MODEL } = require("../model/book.model");
const { auth } = require("../middleware/auth.middleware");
const Book_Router = express.Router();
// Book data collection is here
// book adaded
Book_Router.post("/books",auth, async (req, res) => {
  try {
    const bookdata = new BOOKData_MODEL(req.body);
    await bookdata.save();
    res.status(200).json({ book: bookdata, msg: "data is succesfully add" });
  } catch (error) {
    res.status(400).json(error);
  }
});
// book adding in the mongo db
Book_Router.get("/books/:isbn",auth, async (req, res) => {
  const { isbn } = req.params;
  const { ISBN } = req.body;

  const Bookdata = await BOOKData_MODEL.find({ ISBN: isbn });
  if (Bookdata) {
    try {
      res.status(200).json({ book_data: Bookdata });
    } catch (error) {
      res.status(400).json(error);
    }
  }
});
// updating the data here 
Book_Router.patch("/books/:isbn",auth, async (req, res) => {
  const { isbn } = req.params;
  console.log(isbn);

  const Bookdata = await BOOKData_MODEL.find({ ISBN: isbn });
  if (Bookdata) {
    try {
      await BOOKData_MODEL.updateOne({ ISBN: isbn }, req.body);
      res.status(200).json({ msg: `${isbn} data is upadated` });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
});
// Book is delteing by isbn number
Book_Router.delete("/books/:isbn",auth, async (req, res) => {
  const { isbn } = req.params;

  const Bookdata = await BOOKData_MODEL.find({ ISBN: isbn });
  if (Bookdata) {
    try {
      await BOOKData_MODEL.deleteOne({ ISBN: isbn }, req.body);
      res.status(200).json({ msg: `${isbn} data is deleted` });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
});

module.exports = {
  Book_Router,
};

// GET /books/:isbn: Get a single book by its ISBN.

// POST /books: Add a new book.

// PUT /books/:isbn: Update an existing book by its ISBN.

// DELETE /books/:isbn: Delete a book by its ISBN.
