"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const totalData = Object.assign(Object.assign({}, req.body), { book: bookId });
    const searchedBook = yield book_model_1.Book.findById(totalData.book);
    if (searchedBook.copies < totalData.quantity) {
        if ((searchedBook === null || searchedBook === void 0 ? void 0 : searchedBook.copies) === 0) {
            searchedBook.available = false;
            yield book_model_1.Book.findByIdAndUpdate(searchedBook === null || searchedBook === void 0 ? void 0 : searchedBook._id, searchedBook, {
                new: true,
            });
        }
        throw new Error("You Cant Borrow this much book");
    }
    if ((searchedBook === null || searchedBook === void 0 ? void 0 : searchedBook.copies) === 0 || (searchedBook === null || searchedBook === void 0 ? void 0 : searchedBook.available) === false) {
        throw new Error("Book in not Available this moment.please try later");
    }
    try {
        let newQuantity = Number(searchedBook.copies - totalData.quantity);
        searchedBook === null || searchedBook === void 0 ? void 0 : searchedBook.copies = newQuantity;
        const d1 = yield book_model_1.Book.findByIdAndUpdate(searchedBook === null || searchedBook === void 0 ? void 0 : searchedBook._id, searchedBook, {
            new: true,
        });
        const result = yield borrow_model_1.Borrow.create(totalData);
        res.status(201).json({
            success: true,
            message: "Borrow Created Successfully",
            totalData: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            totalError: err,
        });
    }
}));
exports.borrowRoutes.get("/borrow-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            error: err,
        });
    }
}));
