import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
export const borrowRoutes = express.Router();

borrowRoutes.post("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const totalData = { ...req.body, book: bookId };
  const searchedBook = await Book.findById(totalData.book);
  if (searchedBook.copies < totalData.quantity) {
    if (searchedBook?.copies === 0) {
      searchedBook.available = false;
      await Book.findByIdAndUpdate(searchedBook?._id, searchedBook, {
        new: true,
      });
    }
    throw new Error("You Cant Borrow this much book");
  }

  if (searchedBook?.copies === 0 || searchedBook?.available === false) {
    throw new Error("Book in not Available this moment.please try later");
  }

  try {
    let newQuantity = Number(searchedBook.copies - totalData.quantity);
    searchedBook?.copies = newQuantity;
    const d1 = await Book.findByIdAndUpdate(searchedBook?._id, searchedBook, {
      new: true,
    });

    const result = await Borrow.create(totalData);
    res.status(201).json({
      success: true,
      message: "Borrow Created Successfully",
      totalData: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      totalError: err,
    });
  }
});

borrowRoutes.get("/borrow-summary", async (req: Request, res: Response) => {
  const data = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookInfo",
      },
    },
    {
      $unwind: "$bookInfo",
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
        },
      },
    },
  ]);
  try {
    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});

borrowRoutes.get("/borrows", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.find().populate("book");
    res.status(201).json({
      success: true,
      message: "Borrowed books retrieved successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
borrowRoutes.get("/borrow/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Borrow.findById(id).populate("book");
    res.status(201).json({
      success: true,
      message: "Borrowed books retrieved successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
borrowRoutes.patch("/edit-borrow/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await Borrow.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({
      success: true,
      message: "Borrowed books update successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
borrowRoutes.delete(
  "/delete-borrow/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await Borrow.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Borrowed books deleted successfully",
        data: null,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err?.message,
        error: err,
      });
    }
  }
);
