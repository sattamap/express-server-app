import express from 'express';
import { ProductControllers } from './product.controller';




const router = express.Router();

router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getProducts);
router.get('/products/:productId', ProductControllers.getProductById);


export const ProductRoutes = router;