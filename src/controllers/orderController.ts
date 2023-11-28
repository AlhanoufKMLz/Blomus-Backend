import { NextFunction, Request, Response } from 'express'

import {
  changeOrderStatus,
  createNewOrder,
  findAllOrders,
  findOrder,
  findOrderHistory,
  removeOrder,
} from '../services/orderService'
import ApiError from '../errors/ApiError'

/**-----------------------------------------------
 * @desc Get All Orders
 * @route /api/orders
 * @method GET
 * @access private (admin Only)
 -----------------------------------------------*/
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await findAllOrders()
    res.status(200).json({ message: 'All orders returned successfully', payload: orders })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Get Order By ID
 * @route /api/orders/:orderId
 * @method GET
 * @access private (admin and user)
 -----------------------------------------------*/
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await findOrder(req.params.orderId)
    res.status(200).json({ message: 'Single order returned successfully', payload: order })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Create Order By ID
 * @route /api/orders
 * @method POST
 * @access public
 -----------------------------------------------*/
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await createNewOrder(req.body)
    res.status(201).json({ meassge: 'Order has been created successfuly', payload: order })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Delete Order By ID
 * @route /api/orders/:orderId
 * @method DELETE
 * @access private (admin Only)
 -----------------------------------------------*/
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await removeOrder(req.params.orderId)
    res.status(200).json({ meassge: 'Order has been deleted Successfully', result: order })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Update Order By ID
 * @route /api/orders/:orderId
 * @method PUT
 * @access private (admin Only)
 -----------------------------------------------*/
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderStatus } = req.body
    const updatedOrder = await changeOrderStatus(req.params.orderId, orderStatus)
    res.status(200).json({
      message: 'Category has been updated successfully',
      payload: updatedOrder,
    })
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

/**-----------------------------------------------
 * @desc Get Order History
 * @route /api/orders/history
 * @method GET
 * @access private (admin Only)
 -----------------------------------------------*/
 export const getOrderHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.decodedUser
    const orderHistory = await findOrderHistory(userId)

    res.json({message: 'Order History returned successfully',payload:orderHistory})
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}
