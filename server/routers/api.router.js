'use strict'

const winston = require('winston')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const dbManager = require('../db/manager')

const errorHandler = res => err => {
  winston.error(err)
  res.sendStatus(400)
}

const sendOK = res => () => {
  res.sendStatus(200)
}

router.use(bodyParser.json())

router.get('/messages/:id', (req, res, next) => {
  const {id} = req.params
  dbManager.getMessage(Number(id))
    .then(message => {
      if (message) {
        res.json(message)
      } else {
        next()
      }
    })
    .catch(errorHandler(res))
})

// Update message
router.put('/messages/:id', (req, res, next) => {
  const message = req.body
  dbManager.updateMessage(message)
    .then(sendOK(res))
    .catch(errorHandler(res))
})

router.delete('/messages/:id', (req, res, next) => {
  const {id} = req.params
  dbManager.deleteMessage(id)
    .then(sendOK(res))
    .catch(errorHandler(res))
})

router.post('/messages/create', (req, res, next) => {
  const message = req.body
  dbManager.createMessage(message)
    .then(id => {
      res.json({id})
    })
    .catch(errorHandler(res))
})

router.get('/messages', (req, res, next) => {
  dbManager.getAllMessages()
    .then(messages => {
      if (messages) {
        res.json({messages})
      } else {
        next()
      }
    })
    .catch(errorHandler(res))
})

module.exports = {
  router,
  errorHandler,
  sendOK
}
