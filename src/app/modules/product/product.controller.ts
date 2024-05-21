import { Request, Response } from 'express';

import { ZodError } from 'zod';
import { productSchema } from '../../validation/validation';
import { ProductServices } from './product.service';


const createProduct = async (req: Request, res: Response) => {
    try {
      // Validate request body
      const productData = productSchema.parse(req.body.product);
  
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


  export const ProductControllers = {
    createProduct,
  };