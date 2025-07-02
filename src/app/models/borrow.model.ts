import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Book can not be borrowed 0 or Negative Numbers"],
  },
  dueDate: { type: String },
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
