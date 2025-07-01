"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Book Id must be Provided"],
        ref: "Book",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Book can not be borrowed 0 or Negative Numbers"],
    },
    dueDate: { type: String },
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
