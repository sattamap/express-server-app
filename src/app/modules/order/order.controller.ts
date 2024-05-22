import { Request, Response } from "express";
import { orderSchema } from "../../validation/validation";
import { ProductModel } from "../product/product.model";
import { ZodError } from "zod";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const orderData = orderSchema.parse(req.body);

    const { email, productId, price, quantity } = orderData;

    // Find the product by ID
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if there is sufficient quantity in inventory
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Update inventory quantity and inStock status
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    // Create the order
    const order = await OrderServices.createOrderInDB(orderData);

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    }

    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: (err as Error).message,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (email) {
      // Retrieve orders by email
      const orders = await OrderServices.getOrdersFromDB(email);
      if (orders.length === 0) {
        res.status(404).json({
          success: false,
          message: "Email does not match any orders",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: orders,
        });
      }
    } else {
      // Retrieve all orders
      const orders = await OrderServices.getOrdersFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: (err as Error).message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
