import { NextFunction, Request, Response } from 'express'

import {
  createNewCategory,
  findAllCategories,
  findCategory,
  removeCategory,
  updateCategory,
} from '../services/categoryService'
import ApiError from '../errors/ApiError'

/**-----------------------------------------------
 * @desc Create Category 
 * @route /api/categories/
 * @method POST
 * @access private (Admin Only)
 -----------------------------------------------*/
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await createNewCategory(req.body)
    res.status(201).json({ meassge: 'Category has been created successfuly', payload: category })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Get All Categories
 * @route /api/categories/
 * @method GET
 * @access public 
 -----------------------------------------------*/
export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await findAllCategories()
    res.status(200).json({ message: 'All categories returned successfully', payload: categories })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Get Category by Id
 * @route /api/categories/:id
 * @method GET
 * @access public
 -----------------------------------------------*/
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await findCategory(req.params.id)
    res.status(200).json({ message: 'Single category returned successfully', payload: categories })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Update Category 
 * @route /api/categories/:id
 * @method PUT
 * @access private (Admin Only)
 -----------------------------------------------*/
export const updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id
    const updatedCategory = await updateCategory(categoryId, req.body)
    res
      .status(200)
      .json({ message: 'Category has been updated successfully', payload: updatedCategory })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Delete Category 
 * @route /api/categories/:id
 * @method DELETE
 * @access private (Admin Only)
 -----------------------------------------------*/
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await removeCategory(req.params.id)
    res.status(200).json({ meassge: 'Category has been deleted Successfully', result: category })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}
