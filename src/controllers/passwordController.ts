import { NextFunction, Request, Response } from 'express'

import ApiError from '../errors/ApiError'
import { generateActivationToken } from '../utils/sendEmailUtils'
import { sendResetPasswordEmail } from '../helpers/emailHelpers'
import { updatePassword, checkResetPasswordToken } from '../services/passwordService'
import { checkIfUserExistsByEmail } from '../services/authService'

/**-----------------------------------------------
 * @desc    Send Reset Password Link
 * @route   /api/reset-password
 * @method  POST
 * @access  public
 ------------------------------------------------*/
export const sendResetPasswordLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const user = await checkIfUserExistsByEmail(email)
    if (!user || !user.isAccountVerified) {
      throw ApiError.notFound('No user found with the provided email address')
    }
    const resetToken = generateActivationToken()
    user.resetPasswordToken = resetToken

    await user.save()
    const resetLink = `https://blomus.vercel.app/reset-password/${resetToken}`
    await sendResetPasswordEmail(user.email, user.firstName, resetLink)
    res.json({ message: "Password reset link has been sent to you're email successfully" })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc    Get Reset Password Link
 * @route   /api/reset-password/:userId/:token
 * @method  GET
 * @access  private
 ------------------------------------------------*/
export const getResetPasswordLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, token } = req.params
    await checkResetPasswordToken(userId, token)
    res.status(200).json({ message: 'Password reset is allowed with the valid token' })
  } catch (error) {
    next(error)
  }
}

/**-----------------------------------------------
 * @desc    Reset Password
 * @route   /api/reset-password/:userId/:token
 * @method  POST
 * @access  private
 ------------------------------------------------*/
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params
    const { password } = req.body

    await updatePassword(token, password)
    res.status(200).json({
      message: 'Password has been reset successfully',
    })
  } catch (error) {
    next(error)
  }
}
