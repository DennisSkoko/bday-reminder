import { readFile, writeFile } from 'fs/promises'

if (!process.env.BIRTHDAY_STORAGE_FILE) {
  throw new Error('"BIRTHDAY_STORAGE_FILE" env variable must be set')
}

const filePath = process.env.BIRTHDAY_STORAGE_FILE

/**
 * @returns {Promise<{ [id: string]: Person }>}
 */
export async function read() {
  try {
    return JSON.parse(await readFile(filePath, 'utf-8'))
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
      return {}
    }

    throw err
  }
}

/**
 * @param {(current: StoragePerson) => StoragePerson} modifier
 */
export async function modify(modifier) {
  const data = await read()
  const modifiedData = modifier(data)

  await writeFile(filePath, JSON.stringify(modifiedData), 'utf-8')
}

/**
 * @param {Person} person
 */
export async function put(person) {
  await modify(people => ({ ...people, [person.id]: person }))
}

/**
 * @param {string} id
 */
export async function get(id) {
  const people = await read()
  return people[id]
}

export async function list() {
  return Object.values(await read())
}

/**
 * @param {string} id
 */
export async function remove(id) {
  await modify(people => {
    delete people[id]
    return people
  })
}
