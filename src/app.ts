import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
const app: Application = express();
app.use(express.json());
app.use(cors());

// Book Routes
app.use("/api/book", bookRoutes);
// Borrow Routes
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running successfully" });
});

export default app;
