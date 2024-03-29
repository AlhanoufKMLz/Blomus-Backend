import { NextFunction, Request, Response } from 'express'

import {
  removeProduct,
  findAllProducts,
  updateProduct,
  createNewProduct,
  findProduct,
  findHighestSoldProducts,
  productsCount,
} from '../services/productService'
import { Product } from '../models/productModel'
import ApiError from '../errors/ApiError'

/**-----------------------------------------------
 * @desc Get All Products
 * @route /api/products
 * @method GET
 * @access public
 -----------------------------------------------*/
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string)
    const sortBy = req.query.sortBy?.toString()
    const searchText = req.query.searchText?.toString()
    const category = req.query.category?.toString()

    const { products, totalPages } = await findAllProducts(
      pageNumber,
      sortBy,
      searchText,
      category
    )

    res.status(200).json({ message: 'All products returned', payload: products, totalPages })
  } catch (error) {
    next(error)
  }
}

/** -----------------------------------------------
 * @desc Get Products Count
 * @route /api/products/count
 * @method GET
 * @access public
  -----------------------------------------------*/
export const getProductsCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usersCount = await productsCount()
    res.status(200).json({ meassge: 'Users Count', usersCount })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc Get Product By ID
 * @route /api/products/:productId
 * @method GET
 * @access public
 -----------------------------------------------*/
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await findProduct(req.params.productId)
    res.status(200).json({ message: 'Single product returned', payload: product })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc Delete Product by ID
 * @route /api/products/:productId
 * @method DELETE
 * @access private (admin Only)
 -----------------------------------------------*/
export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await removeProduct(req.params.productId)
    if (!product) {
      throw ApiError.notFound(`Product not found with ID: ${req.params.productId}`)
    }
    res.status(200).json({
      message: 'Product has been deleted successfully',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc Create Product
 * @route /api/products
 * @method POST
 * @access private (admin Only)
 -----------------------------------------------*/
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quantityInStock, categories, discount, sizes } = req.body
    const parsedQuantityInStock = parseInt(quantityInStock)
    const parsedProductPrice = parseFloat(price)
    const product = new Product({
      name,
      description,
      price: parsedProductPrice,
      image: req.fileLocation,
      quantityInStock: parsedQuantityInStock,
      discount,
      categories: categories.split(','),
      sizes: sizes.split(','),
    })

    const newProduct = await createNewProduct(product)
    res.status(201).json({ message: 'Product has been created successfully', payload: newProduct })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc Update Product
 * @route /api/products/:id
 * @method PUT
 * @access private (admin Only)
 -----------------------------------------------*/
export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = req.file?.path
    const categories = req.body.categories?.split(',')
    const sizes = req.body.sizes?.split(',')

    const updatedProduct = await updateProduct(
      req.params.productId,
      req.body,
      categories,
      sizes,
      image
      )

    res
      .status(200)
      .json({ message: 'Product has been updated successfully', payload: updatedProduct })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc Get HighestSold Product
 * @route /api/products/highest-sold
 * @method GET
 * @access public
 -----------------------------------------------*/
export const getHighestSoldProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const highestSoldProducts = await findHighestSoldProducts(Number(req.query.limit))

    res.status(200).json({
      message: 'Highest Sold Products have been returned successfully',
      payload: highestSoldProducts,
    })
  } catch (error) {
    next(error)
  }
}
