import express, { Application, Request, Response, NextFunction } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
import cors from "cors";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// Welcome route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to express app!");
});

// Catch-all middleware for handling 404 errors (Route not found)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

export default app;
