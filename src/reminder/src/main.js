import { format, parse } from 'date-fns'
import { getEmailContent } from './getEmailContent.js'
import { client } from './emailClient.js'
import * as birthdays from './birthdays.js'

/**
  * @param {string} date
  */
function getAge(date) {
  const now = new Date()
  const year = now.getFullYear()
  const birthyear = parse(date, 'yyyy-MM-dd', now).getFullYear()

  return year - birthyear
}

const today = format(new Date(), 'MM-dd')

const emails = (await birthdays.get())
  .filter(person => person.birthday.slice(5) == today)
  .map(person => ({ name: person.name, age: getAge(person.birthday) }))
  .map(person => getEmailContent(person))

await Promise.all(
  emails.map(email => client.sendMail({
    from: process.env.BIRTHDAY_SMTP_USERNAME,
    to: process.env.BIRTHDAY_NOTIFY_EMAIL,
    subject: email.subject,
    text: email.text,
    html: email.html
  }))
)

client.close()
