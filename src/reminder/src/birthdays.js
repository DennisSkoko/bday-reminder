import fetch from 'node-fetch'

if (!process.env.BIRTHDAY_ENDPOINT) {
  throw new Error('BIRTHDAY_ENDPOINT must be set')
}

const endpoint = process.env.BIRTHDAY_ENDPOINT

export async function get() {
  const response = await fetch(`${endpoint}/person`)

  if (!response.ok) {
    throw new Error('Failed to fetch birthdays')
  }

  return /** @type {Person[]} */ (await response.json())
}
