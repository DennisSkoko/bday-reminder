'use strict'

const putBirthday = require('./putBirthday')
const handler = require('./handler')

jest.mock('./putBirthday')

it('throws if `birthday.birthDate` is not given', async () => {
  const promise = handler({ name: 'Foo', birthYear: '1990' })
  await expect(promise).rejects.toThrow(/birthDate.*required/)
})

it('throws if `birthday.name` is not given', async () => {
  const promise = handler({ birthDate: '02-18', birthYear: '1990' })
  await expect(promise).rejects.toThrow(/name.*required/)
})

it('throws if `birthday.birthYear` is not given', async () => {
  const promise = handler({ birthDate: '02-18', name: 'Bar' })
  await expect(promise).rejects.toThrow(/birthYear.*required/)
})

it('creates the given birthday', async () => {
  await handler({ birthDate: '02-18', name: 'Biz', birthYear: '1990' })

  expect(putBirthday).toHaveBeenCalledWith({
    birthDate: '02-18',
    name: 'Biz',
    birthYear: '1990'
  })
})
