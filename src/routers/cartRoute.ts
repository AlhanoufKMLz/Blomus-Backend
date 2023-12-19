import express from 'express'

import {
  addToCart,
  updateCartItemQuantity,
  getCartItems,
  deleteCartById,
  deleteCartItem,
} from '../controllers/cartController'
import { validateObjectId } from '../middlewares/validateObjectId'
import { validateCart } from '../validation/validateCart'
import { checkAuth } from '../middlewares/verifyToken'

const router = express.Router()

router.get('/', checkAuth, getCartItems)

router.post('/', checkAuth, validateCart, addToCart)

router.put('/update-quantity', checkAuth, updateCartItemQuantity)
router.put('/', checkAuth, deleteCartItem)

router.delete('/:cartId', validateObjectId('cartId'), deleteCartById)

export default router
