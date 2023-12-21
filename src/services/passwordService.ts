import ApiError from '../errors/ApiError'
import { User } from '../models/userModel'
import bcrypt from 'bcrypt'

//** Service:- Update Password  */
export const updatePassword = async (resetPasswordToken: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.findOne({ resetPasswordToken })
  if (!user) {
    throw ApiError.notFound('Invalid token')
  }
  user.password = hashedPassword
  user.resetPasswordToken = undefined

  await user.save()
}

//** Service:- Reset Password  */
export const resetPassword = async (userId: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        password: hashedPassword,
        resetPasswordToken: undefined,
      },
    },
    { new: true }
  )
  if (!user) {
    throw ApiError.notFound('User not found with the entered ID')
  }
  return user
}

//** Service:- Check Reset Passord Token  */
export const checkResetPasswordToken = async (userId: string, token: string) => {
  const user = await User.findOne({
    _id: userId,
    resetPasswordToken: token,
  })

  if (!user) {
    throw ApiError.badRequest('Invalid token')
  }

  return user
}
