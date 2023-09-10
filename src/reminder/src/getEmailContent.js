import Mustache from 'mustache'
import { marked } from 'marked'

const subjectTemplate = `{{ person.name }} is having their birthday today!`
const textTemplate = `{{ person.name }} is now {{ person.age }} years old now, don't forget to congratulate her/him.`

/**
 * @param {object} person
 * @param {string} person.name
 * @param {number} person.age
 */
export function getEmailContent(person) {
  const subjectContent = Mustache.render(subjectTemplate, { person })
  const textContent = Mustache.render(textTemplate, { person })
  const htmlContent = marked(textContent, { mangle: false, headerIds: false })

  return { subject: subjectContent, text: textContent, html: htmlContent }
}
