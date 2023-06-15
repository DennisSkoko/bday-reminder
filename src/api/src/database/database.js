import mongoose from 'mongoose'

if (!process.env.APP_DATABASE_URI) throw new Error('Must define `APP_DATABASE_URI` env variable')

export const database = await mongoose.connect(process.env.APP_DATABASE_URI)
