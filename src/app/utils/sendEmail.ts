import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  })

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Password</title>
        <style>
          body {
            font-family: Lora, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 50px auto;
            text-align: center;
          }
          .title {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
          }
          .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
          }
          
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 class="title">Reset Your Password</h2>
          <p class="message">
            We received a request to reset your password. Please click the button below to reset your password:
          </p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #1990C6; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Reset Password</a>
          <p class="message">
            If you did not request a password reset, please ignore this email or contact support if you have any questions.
          </p>
          <div class="footer">
            PowerPulse Fitness © 2024. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `

  // Send mail with defined transport object
  await transporter.sendMail({
    from: 'shaifshajedt@gmail.com', // sender address
    to, // recipient email
    subject: 'Reset Your Password', // Subject line
    text: `Please click the following link to reset your password: ${resetLink}`, // plain text body
    html, // HTML body
  })
}
