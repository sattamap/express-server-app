import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import cors from "cors";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to express app!");
});

export default app;
