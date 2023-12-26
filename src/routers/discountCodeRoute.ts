import express from 'express'

import { checkAuth, checkRole } from '../middlewares/verifyToken'
import {
  addDiscountCode,
  deleteDiscountCode,
  getDiscountCodeByCode,
  getDiscountCodes,
  getValidDiscountCodes,
  updateDiscountCodeById,
} from '../controllers/discountCodeController'
import { validateObjectId } from '../middlewares/validateObjectId'

const router = express.Router()

router.get('/valid', getValidDiscountCodes)
router.get('/', checkAuth, checkRole('ADMIN'), getDiscountCodes)
router.get('/:code', checkAuth, checkRole('ADMIN'), getDiscountCodeByCode)


router.post('/', checkAuth, checkRole('ADMIN'), addDiscountCode)

router.put(
  '/:discountCodeId',
  checkAuth,
  checkRole('ADMIN'),
  validateObjectId('discountCodeId'),
  updateDiscountCodeById
)

router.delete(
  '/:discountCodeId',
  checkAuth,
  checkRole('ADMIN'),
  validateObjectId('discountCodeId'),
  deleteDiscountCode
)

export default router
