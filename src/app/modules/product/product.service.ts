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

  
const getProductByIdFromDB = async (productId: string) => {
    const product = await ProductModel.findById(productId);
    return product;
  };


  const updateProductInDB = async (productId: string, updateData: Partial<Product>) => {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    return updatedProduct;
  };
  

  const deleteProductFromDB = async (productId: string) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  };



  export const ProductServices = {
    createProductIntoDB,
    retrieveProducts,
    getProductByIdFromDB,
    updateProductInDB,
    deleteProductFromDB

  };