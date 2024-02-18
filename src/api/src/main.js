import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { v4 } from 'uuid'
import { add, isWithinInterval, parse, isBefore } from 'date-fns'
import * as storage from './person.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

app.put('/person', async (req, res) => {
  /** @type {Person} */
  const person = { id: req.body.id || v4(), ...req.body }

  await storage.put(person)

  res.status(201).json(person)
})

app.get('/person/:id', async (req, res) => {
  res.json(await storage.get(req.params.id))
})

app.get('/person', async (_req, res) => {
  res.json(await storage.list())
})

app.delete('/person/:id', async (req, res) => {
  await storage.remove(req.params.id)

  res.sendStatus(204)
})

app.get('/birthday/upcoming', async (_req, res) => {
  const start = new Date()
  const end = add(start, { months: 1 })
  const people = await storage.list()
  const now = new Date()

  const upcomingBirthdays = people
    .filter(person => {
      let birthday = parse(person.birthday.slice(5), 'MM-dd', now)

      if (isBefore(birthday, now)) {
        birthday = add(birthday, { years: 1 })
      }

      return isWithinInterval(birthday, { start, end })
    })
    .sort((a, b) => a.birthday.slice(5).localeCompare(b.birthday.slice(5)))

  res.json(upcomingBirthdays)
})

app.listen(5000, () => {
  console.log('Server started')
})
