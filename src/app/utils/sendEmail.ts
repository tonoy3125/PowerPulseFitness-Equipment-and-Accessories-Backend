import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'shaifshajedt@gmail.com',
      pass: 'zsur sivd eakq yajc',
    },
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'shaifshajedt@gmail.com', // sender address
    to, // list of receivers
    subject: 'Customer account password reset', // Subject line
    text: '', // plain text body
    html, // html body
  })
}
