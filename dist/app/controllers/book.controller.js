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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/create-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield book_model_1.Book.create(data);
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
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
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.find();
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
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
exports.bookRoutes.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield book_model_1.Book.findById(id);
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
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
exports.bookRoutes.patch("/edit-book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const result = yield book_model_1.Book.findByIdAndUpdate(id, data, { new: true });
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
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
exports.bookRoutes.delete("/delete-book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield book_model_1.Book.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
            totalData: null,
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
