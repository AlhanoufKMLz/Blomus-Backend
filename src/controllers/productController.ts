import { Request, Response } from 'express'
import { Product } from '../models/productModel'

/**
 * @desc Get All Products
 * @route /api/products
 * @method GET
 * @access public
 */
export const getAllProducts = async (req: Request, res: Response) => {
  const productPerPage: number = 8
  const { pageNumber, lowestPrice, highestPrice, newest } = req.query
  let products

  if (pageNumber) {
    const pageNum: number = +pageNumber
    products = await Product.find()
      .skip((pageNum - 1) * productPerPage)
      .limit(productPerPage)
      .sort({ createdAt: -1 })
  } else if (highestPrice) {
    products = await Product.find().sort({ price: -1 })
  } else if (lowestPrice) {
    products = await Product.find().sort({ price: 1 })
  } else if (newest) {
    products = await Product.find().sort({ createdAt: -1 })
  } else {
    products = await Product.find().sort({ createdAt: -1 })
  }
  res.status(200).json(products)
}

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'product not found' })
  }
  res.status(200).json({ product })
}
