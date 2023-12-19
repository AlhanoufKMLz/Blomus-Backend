import { NextFunction, Request, Response } from 'express'

import {
  addItem,
  calculateTotalPrice,
  createCart,
  deleteCart,
  deleteItemFromCart,
  findCart,
  updateQuantity,
} from '../services/cartService'
import { checkStock, findProduct } from '../services/productService'

/** -----------------------------------------------
 * @desc Add to cart
 * @route /api/cart/
 * @method POST
 * @access public
  -----------------------------------------------*/
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.decodedUser.userId
    const { productId, quantity, discountCode } = req.body

    const product = await findProduct(productId)

    await checkStock(productId, quantity)

    let cart = await createCart(userId)

    cart = await addItem(cart, quantity, product)

    const totalPrice = await calculateTotalPrice(cart, discountCode)

    res.json({
      message: 'Product has been added to the cart successfully',
      cart,
      Price: totalPrice,
    })
  } catch (error) {
    next(error)
  }
}

/** -----------------------------------------------
 * @desc Get cart items
 * @route /api/cart/:id
 * @method GET
 * @access private (user himself only)
  -----------------------------------------------*/
export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.decodedUser.userId

    const cart = await findCart(userId)
    const itemsCount = cart.products.reduce((count, product) => count + product.quantity, 0)
    const { totalPrice, savedAmount, totalAfterDiscount } = await calculateTotalPrice(cart)

    res.status(200).json({
      message: 'All cart items returned',
      cartItems: cart.products,
      itemsCount: itemsCount,
      totalPrice: totalPrice,
      savedAmount: savedAmount,
      totalAfterDiscount: totalAfterDiscount,
    })
  } catch (error) {
    next(error)
  }
}

/** -----------------------------------------------
 * @desc Update cart items
 * @route /api/cart/:id
 * @method PUT
 * @access private (user himself only)
  -----------------------------------------------*/
export const updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.decodedUser
    const { productId, updateType } = req.body

    const { item } = await updateQuantity(userId, productId, updateType)

    res.status(200).json({ message: 'Cart item has been updated successfully', item })
  } catch (error) {
    next(error)
  }
}

/** -----------------------------------------------
 * @desc Delete cart item
 * @route /api/cart/:id
 * @method DELETE
 * @access private (user himself only)
  -----------------------------------------------*/
export const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.decodedUser.userId
    const { productId } = req.body
    await deleteItemFromCart(userId, productId)

    res
      .status(200)
      .json({ meassge: 'Product has been deleted from the cart successfully', result: productId })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc Delete cart by ID
 * @route /api/cart/:id
 * @method DELETE
 * @access private (admin Only)
 -----------------------------------------------*/
export const deleteCartById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await deleteCart(req.params.id)
    res.status(200).json({
      message: 'Cart has been deleted Successfully',
      payload: cart,
    })
  } catch (error) {
    next(error)
  }
}
