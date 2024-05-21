import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
const app: Application = express();



// application routes
app.use('/api', ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to express app!");
});

export default app;
