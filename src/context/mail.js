'use strict'

const template = require('lodash.template')
const nodemailer = require('nodemailer')

module.exports = ({ settings, fs, markdown }) => {
  const format = template(fs.readFileSync(settings.mailer.template, 'utf8'))
  const mailer = nodemailer.createTransport(settings.mailer)

  return person => new Promise((resolve, reject) => {
    const content = format(person)

    const message = {
      from: settings.mailer.auth.user,
      to: settings.mailer.to.email,
      subject: person.name + ' fyller år',
      text: content,
      html: '<html><body>' + markdown(content) + '</body></html>'
    }

    mailer.sendMail(message, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}
