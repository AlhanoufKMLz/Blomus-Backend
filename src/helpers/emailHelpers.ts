import { sendEmail } from '../utils/sendEmailUtils'

export const sendActivationEmail = async (email: string, activationLink: string) => {
  const subject = 'Welcome to Blomus!'
  const htmlTemplate = `
  <div style="background-color: #f4f4f5; padding: 1.75rem; text-align: center;">
    <img style="width: 7rem;" src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646934655-logo.png" alt="Blomus Logo" />
    <p style="color: #727e7e; font-weight: bold;">
        Activate your account and discover the exciting features and benefits of Blomus.
    </p>
    <a href="${activationLink}" style="background-color: #be9995; padding: 1rem; margin: 0.75rem; border-radius: 0.5rem; color: #f4f4f5; text-decoration: none; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        Activate Account
    </a>
    <div style="display: flex; flex-direction: column; align-items: center;">
        <p style="color: #727e7e;">
            We're here to make your experience exceptional. If you have any questions or encounter
            issues during the activation process, please don't hesitate to contact our support team.
        </p>
        <p style="color: #727e7e; font-weight: bold;">
            Thank you for choosing Blomus. We look forward to seeing you around!
        </p>
        <p style="color: #727e7e;">Best regards,</p>
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
  <div
  style="
    background-color: rgb(244 244 245);
    padding: 1.75rem;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
  "
>
  <img
    style="width: 7rem"
    src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646934655-logo.png"
  />
  <p style="color: #727e7e; font-weight: bold">
    Hello ${firstName}, We received a request to reset the password for your Blomus account. To
    proceed, click the button below:
  </p>
  <a
    href="${resetLink}"
    style="
      background-color: #be9995;
      padding: 1rem;
      margin: 0.75rem;
      width: fit-content;
      border-radius: 0.5rem;
      color: rgb(244 244 245);
      text-decoration: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    "
  >
    Reset Password
  </a>
  <div style="display: flex; flex-direction: column; align-items: center">
    <p style="color: #727e7e">
      If you didn't request this, you can safely ignore this email – your password will remain
      unchanged.
    </p>
    <span style="color: #727e7e; font-weight: bold">
      If you need assistance, please contact us.
    </span>
    <span style="color: #727e7e">Best regards,</span>
  </div>
</div>
  `
  return await sendEmail(email, subject, htmlTemplate)
}

export const sendOrderConfirmationEmail = async (email: string) => {
  const subject = 'Order Confirmation'
  const htmlTemplate = `
  <body>
  <div
    style="
      background-color: rgb(244 244 245);
      padding: 1.75rem;
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      align-items: center;
    "
  >
    <img
      style="width: 7rem"
      src="https://sda-ecommerce.s3.eu-north-1.amazonaws.com/1703646934655-logo.png"
    />
    <div style="display: flex; flex-direction: column; align-items: center">
      <p style="color: #727e7e; font-weight: bold">
        Hello, We're excited to confirm that your order with Blomus has been
        successfully received.
      </p>
      <span style="color: #727e7e">
        We are processing your order with care, and you will receive a confirmation email with
        tracking information once your order ships.
      </span>
      <span style="color: #727e7e; font-weight: bold">
        If you have any questions or concerns,, please contact us.
      </span>
      <span style="color: #727e7e">Best regards,</span>
    </div>
  </div>
</body>
      `
  return await sendEmail(email, subject, htmlTemplate)
}
