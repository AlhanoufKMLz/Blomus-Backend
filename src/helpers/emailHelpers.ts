import { sendEmail } from '../utils/sendEmailUtils'

export const sendActivationEmail = async (email: string, activationLink: string) => {
  const subject = 'Welcome to Blomus!'
  const htmlTemplate = `
  <div style="background-color: #f4f4f5; padding: 1.75rem; text-align: center;">
    <img style="width: 7rem;" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646934655-logo.png" alt="Blomus Logo" />
    <p style="color: #727e7e; font-weight: bold;">
        Activate your account and discover the exciting features and benefits of Blomus.
    </p>
    <a href="${activationLink}" style="background-color: #be9995; padding: 10px 20px; border-radius: 5px; color: #f4f4f5; text-decoration: none; display: inline-block; margin: 15px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        Activate Account
    </a>
    <div style="text-align: center; color: #727e7e; margin-top: 15px;">
        <p>
            We're here to make your experience exceptional. If you have any questions or encounter
            issues during the activation process, please don't hesitate to contact our support team.
        </p>
        <p style="font-weight: bold;">
            Thank you for choosing Blomus. We look forward to seeing you around!
        </p>
        <p>Best regards,</p>
    </div>
</div>
`
  const isSent = await sendEmail(email, subject, htmlTemplate)
  return isSent
}

export const sendResetPasswordEmail = async (
  email: string,
  firstName: string,
  resetLink: string
) => {
  const subject = 'Reset Your Blomus Password'
  const htmlTemplate = `
  <div style="background-color: #f4f4f5; padding: 1.75rem; text-align: center;">
  <img style="width: 7rem;" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646934655-logo.png" alt="Blomus Logo" />
  <p style="color: #727e7e; font-weight: bold;">
      Hello ${firstName}, We received a request to reset the password for your Blomus account. To proceed, click the button below:
  </p>
  <a href="${resetLink}" style="background-color: #be9995; padding: 10px 20px; border-radius: 5px; color: #f4f4f5; text-decoration: none; display: inline-block; margin: 15px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      Reset Password
  </a>
  <div style="text-align: center; color: #727e7e;">
      <p>
          If you didn't request this, you can safely ignore this email – your password will remain unchanged.
      </p>
      <p style="font-weight: bold;">
          If you need assistance, please contact us.
      </p>
      <p>Best regards,</p>
  </div>
</div>
  `
  return await sendEmail(email, subject, htmlTemplate)
}

export const sendOrderConfirmationEmail = async (email: string) => {
  const subject = 'Order Confirmation'
  const htmlTemplate = `
  <div style="background-color: #f4f4f5; padding: 1.75rem; text-align: center;">
    <img style="width: 7rem;" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646934655-logo.png" alt="Blomus Logo" />
    <div style="text-align: center; color: #727e7e; margin-top: 15px;">
        <p style="font-weight: bold; color:be9995;">
            Hello, We're excited to confirm that your order with Blomus has been successfully received.
        </p>
        <span>
            We are processing your order with care, and you will receive a confirmation email with tracking information once your order ships.
        </span>
        <span style="font-weight: bold;">
            If you have any questions or concerns, please contact us.
        </span>
        <span>Best regards,</span>
    </div>
</div>
      `
  return await sendEmail(email, subject, htmlTemplate)
}
