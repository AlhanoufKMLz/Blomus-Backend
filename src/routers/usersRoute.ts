import express from 'express'

import {
  blockUserById,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsersCount,
  switchUserRole,
  updateUserById,
} from '../controllers/userController'
import { uploadavatar } from '../middlewares/uploadImage'
import { checkAuth, checkOwnership, checkRole } from '../middlewares/verifyToken'
import { validateObjectId } from '../middlewares/validateObjectId'

const router = express.Router()

// Get all users route
router.get('/', checkAuth, checkRole('ADMIN'), getAllUsers)
// Get users count route
router.get('/count', checkAuth, checkRole('ADMIN'), getUsersCount)
// Get users by id route
router.get('/:userId', checkAuth, checkRole('ADMIN'), validateObjectId('userId'), getUserById)

// Delete user by id route
router.delete('/:userId', checkAuth, validateObjectId('userId'), deleteUser)

// Update user by id route
router.put(
  '/:userId',
  checkAuth,
  uploadavatar.single('avatar'),
  validateObjectId('userId'),
  checkOwnership,
  updateUserById
)
// Switch user role
router.put(
  '/:userId/switch-role',
  checkAuth,
  checkRole('ADMIN'),
  validateObjectId('userId'),
  switchUserRole
)
// Block user by id route
router.put(
  '/:userId/block',
  checkAuth,
  checkRole('ADMIN'),
  validateObjectId('userId'),
  blockUserById
)

export default router
