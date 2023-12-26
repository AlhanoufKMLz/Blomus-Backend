import express from 'express'

import { uploadImage } from '../middlewares/uploadImage'
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getHighestSoldProducts,
  getProductById,
  getProductsCount,
  updateProductById,
} from '../controllers/productController'
import { validateObjectId } from '../middlewares/validateObjectId'
import { checkAuth, checkRole } from '../middlewares/verifyToken'
import { validateProduct } from '../validation/validateProduct'
import uploadImageToS3 from '../middlewares/uploadImageToS3'

const router = express.Router()

// Get all products route
router.get('/', getAllProducts)
// Get products count route
router.get('/count', getProductsCount)
// Get higest-sold products route 
router.get('/highest-sold', getHighestSoldProducts)
// Get product by id route
router.get('/:productId', validateObjectId('productId'), getProductById)


// Add new product route
router.post(
  '/',
  checkAuth,
  checkRole('ADMIN'),
  uploadImageToS3,
  validateProduct,
  createProduct
)

// Delete product bu id route
router.delete(
  '/:productId',
  checkAuth,
  checkRole('ADMIN'),
  validateObjectId('productId'),
  deleteProductById
)

// Update product by id route
router.put(
  '/:productId',
  checkAuth,
  checkRole('ADMIN'),
  validateObjectId('productId'),
  uploadImageToS3,
  validateProduct,
  updateProductById
)

export default router
