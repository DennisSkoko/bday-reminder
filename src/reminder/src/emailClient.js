import nodemailer from 'nodemailer'

if (!process.env.BIRTHDAY_SMTP_PORT) throw new Error()

export const client = nodemailer.createTransport({
  host: process.env.BIRTHDAY_SMTP_HOST,
  port: parseInt(process.env.BIRTHDAY_SMTP_PORT),
  secure: process.env.BIRTHDAY_SMTP_SECURE == 'true',
  auth: {
    user: process.env.BIRTHDAY_SMTP_USERNAME,
    pass: process.env.BIRTHDAY_SMTP_PASSWORD
  },
  tls: {
    ciphers:'SSLv3'
  }
})
