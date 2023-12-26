import { Cart } from '../models/cartModel'
import { CartDocument, ProductDocument, DiscountCodeDocument } from '../types/types'
import { Product } from '../models/productModel'
import ApiError from '../errors/ApiError'
import { DiscountCode } from '../models/discountCodeModel'

//** Service:- Create Cart */
export const createCart = async (userId: string): Promise<CartDocument> => {
  let cart = await Cart.findOne({ user: userId })
  if (!cart) {
    cart = await Cart.create({ user: userId, products: [] })
  }
  return cart
}

//** Service:- Add item to cart */
export const addItem = async (
  cart: CartDocument,
  quantity: number,
  product: ProductDocument
): Promise<CartDocument> => {
  const existingCartItem = cart.products.find(
    (p) => p.product.toString() === product._id.toString()
  )
  if (existingCartItem) {
    existingCartItem.quantity += quantity
  } else {
    cart.products.push({ product: product._id, quantity: quantity })
  }
  await cart.save()

  return cart
}

//** Service:- Find User Cart */
export const findCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate('products.product')
  if (!cart) {
    throw ApiError.notFound(`Cart not found with userId: ${userId}`)
  }
  return cart
}

//** Service:- Update cart items */
export const updateQuantity = async (userId: string, cartItemId: string, updateType: string) => {
  const cart = await Cart.findOne({ user: userId })
  if (!cart) {
    throw ApiError.notFound(`Cart not found`)
  }

  const CartItemIndex = cart.products.findIndex((item) => item.product.toString() === cartItemId)
  if (CartItemIndex === -1) {
    throw ApiError.notFound('Product not found in the cart')
  }

  if (updateType === 'inc') {
    cart.products[CartItemIndex].quantity++
  } else if (updateType === 'dec') {
    cart.products[CartItemIndex].quantity--
  }

  const updatedCart = await cart.save()
  if (updatedCart.products[CartItemIndex].quantity === 0) {
    deleteItemFromCart(userId, cartItemId)
  }

  return { item: cart.products[CartItemIndex] }
}

//** Service:- Delete item from cart */
export const deleteItemFromCart = async (userId: string, carttItemId: string) => {
  //check if the cart exist
  const cart = await Cart.findOne({ user: userId })
  if (!cart) {
    throw ApiError.notFound(`Cart not found with userId: ${userId}`)
  }

  // check if the product in the cart
  const cartItem = cart.products.find((p) => p.product.toString() === carttItemId)
  if (!cartItem) {
    throw ApiError.notFound(`Product with id: ${carttItemId} not found in the cart`)
  }

  //delete the product from the cart
  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId, 'products.product': carttItemId },
    { $pull: { products: { product: carttItemId } } },
    { new: true }
  )

  return updatedCart
}

//** Service:- Delete Cart */
export const deleteCart = async (userId: string) => {
  const cart = await Cart.findOneAndDelete({ user: userId })
  if (!cart) {
    throw ApiError.notFound(`Cart not found with the ID: ${userId}`)
  }
  return cart
}
