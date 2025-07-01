import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
export const bookRoutes = express.Router();

bookRoutes.post("/create-book", async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await Book.create(data);
    res.status(201).json({
      success: true,
      message: "Book Created Successfully",
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

bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const result = await Book.find();
    res.status(201).json({
      success: true,
      message: "Book Created Successfully",
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
bookRoutes.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Book.findById(id);
    res.status(201).json({
      success: true,
      message: "Book Created Successfully",
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
bookRoutes.patch("/edit-book/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await Book.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Book Created Successfully",
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
bookRoutes.delete("/delete-book/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Book Created Successfully",
      totalData: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      totalError: err,
    });
  }
});
