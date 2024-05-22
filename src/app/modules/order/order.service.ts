import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderInDB = async (orderData: Order): Promise<Order> => {
  try {
    const order = await OrderModel.create(orderData);
    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${(error as Error).message}`);
  }
};

const getOrdersFromDB = async (email?: string): Promise<Order[]> => {
  try {
    let orders;
    if (email) {
      orders = await OrderModel.find({ email });
    } else {
      orders = await OrderModel.find();
    }
    return orders;
  } catch (error) {
    throw new Error(`Error retrieving orders: ${(error as Error).message}`);
  }
};

export const OrderServices = {
  createOrderInDB,
  getOrdersFromDB,
};
