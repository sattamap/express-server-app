
import { ZodError } from 'zod';
import { productSchema } from '../../validation/validation';
import { ProductServices } from './product.service';
import { Request, Response } from 'express';


const createProduct = async (req: Request, res: Response) => {
    try {
      // Validate request body
      const productData = productSchema.parse(req.body);
  
      const result = await ProductServices.createProductIntoDB(productData);
  
      res.status(200).json({
        success: true,
        message: 'Product created successfully',
        data: result,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: err.errors,
        });
      }
  
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: (err as Error).message,
      });
    }
  };




  const getProducts = async (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.searchTerm as string;
      let products;
  
      if (searchTerm) {
        // Search products based on the searchTerm
        products = await ProductServices.retrieveProducts(searchTerm);
        if (products.length === 0) {
          res.status(404).json({
            success: false,
            message: `No products found matching search term '${searchTerm}'`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
          });
        }
      } else {
        // Get all products if no searchTerm provided
        products = await ProductServices.retrieveProducts();
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: products,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Error retrieving products',
        //error: err.message,
      });
    }
  };


  const getProductById = async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId;
      const product = await ProductServices.getProductByIdFromDB(productId);
      if (product) {
        res.status(200).json({
          success: true,
          message: 'Product fetched successfully!',
          data: product,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Error retrieving product',
        //error: err.message,
      });
    }
  };
  
  const updateProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId;
      const updateData = req.body;
      const updatedProduct = await ProductServices.updateProductInDB(productId, updateData);
  
      if (updatedProduct) {
        res.status(200).json({
          success: true,
          message: 'Product updated successfully!',
          data: updatedProduct,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Error updating product',
        //error: err.message,
      });
    }
  };

  export const ProductControllers = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
  };