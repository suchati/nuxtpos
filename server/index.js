import express from 'express'
import body from 'body-parser'
import fileupload from 'express-fileupload'
import Route from './Routes'

const app = express()
const { urlencoded, json } = body
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(json())
app.use(fileupload())
app.use(Route)

export default {
  path: '/api',
  handler: app
}
