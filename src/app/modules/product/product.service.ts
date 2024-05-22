import { Product } from "./product.interface";
import { ProductModel } from "./product.model";


const createProductIntoDB = async (product: Product) => {
    const result = await ProductModel.create(product);
    return result;
  };


  const retrieveProducts = async (searchTerm?: string) => {
    let query = {};
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
        query = {
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        };
    }
    const products = await ProductModel.find(query);
    return products;
};


  export const ProductServices = {
    createProductIntoDB,
    retrieveProducts

  };