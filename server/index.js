'use strict'

const express = require('express')
const app = express()
const compression = require('compression')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')

const args = process.argv.slice(2)
const port = args[0] || 3000

const apiRouter = require('./routers/api.router').router

app.use(morgan('combined'))
app.use(compression({level: 9}))
app.use('/', express.static(path.join(__dirname, '../dist')))

app.use('/api', apiRouter, (req, res) => {
  res.sendStatus(404)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, () => {
  winston.info(`Server listening on port ${port}!`)
})
