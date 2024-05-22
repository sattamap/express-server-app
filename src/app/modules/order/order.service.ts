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

export const OrderServices = {
    createOrderInDB,
};
