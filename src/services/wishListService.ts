import ApiError from '../errors/ApiError'
import { WishList } from '../models/wishListModel'
import { ProductDocument, WishListDocument } from '../types/types'

//** Service:- Find a wishlist */
export const findWishList = async (userId: string) => {
  const wishlist = await WishList.findOne({ user: userId }).populate('products.product')
  if (!wishlist) {
    throw ApiError.notFound('Wishlist not found')
  }
  return wishlist
}

//** Service:- Create a wishlist */
export const createWishList = async (userId: string): Promise<WishListDocument> => {
  let wishlist = await WishList.findOne({ user: userId })
  if (!wishlist) {
    wishlist = await WishList.create({ user: userId, products: [] })
  }
  return wishlist
}

// ** Add Item to Wishlist */
export const addItemToWishList = async (wishlist: WishListDocument, product: ProductDocument) => {
  const existingWishListItem = wishlist.products.find(
    (p) => p.product === product._id
    )
  if (!existingWishListItem) {
    wishlist.products.push({ product: product._id })
  }
  return await wishlist.save()
}

//** Service:- Remove from wishlist */
export const removeFromWishList = async (product: ProductDocument, userId: string) => {
  const wishlist = await WishList.findOne({ user: userId })
  if (!wishlist) {
    throw ApiError.notFound('Wishlist not found')
  }

  const productFound = await WishList.findOneAndUpdate(
    { user: userId },
    { $pull: { products: { product: product._id } } },
    { new: true }
  )

  if (!productFound) {
    throw ApiError.notFound('Product not found in wishlist');
  }

  return product
}
