'use strict'

const winston = require('winston')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const dbManager = require('../db/manager')

const errorHandler = res => err => {
  if (process.env.NODE_ENV !== 'test') winston.error(err)
  res.sendStatus(400)
}

const sendOK = res => () => {
  res.sendStatus(200)
}

router.use(bodyParser.json())

const onMessageGet = (req, res, next) => {
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
}
router.get('/messages/:id', onMessageGet)

const onMessageUpdate = (req, res, next) => {
  const {id} = req.params
  const message = req.body
  message.id = id
  dbManager.updateMessage(message)
    .then(sendOK(res))
    .catch(errorHandler(res))
}
router.put('/messages/:id', onMessageUpdate)

const onMessageDelete = (req, res, next) => {
  const {id} = req.params
  dbManager.deleteMessage(id)
    .then(sendOK(res))
    .catch(errorHandler(res))
}
router.delete('/messages/:id', onMessageDelete)

const onMessageCreate = (req, res, next) => {
  const message = req.body
  dbManager.createMessage(message)
    .then(id => {
      res.status(201).json({id})
    })
    .catch(errorHandler(res))
}
router.post('/messages', onMessageCreate)

const onMessagesGet = (req, res, next) => {
  dbManager.getAllMessages()
    .then(messages => {
      if (messages) {
        res.json({messages})
      } else {
        next()
      }
    })
    .catch(errorHandler(res))
}
router.get('/messages', onMessagesGet)

module.exports = {
  router,
  errorHandler,
  sendOK,
  onMessageCreate,
  onMessageDelete,
  onMessageGet,
  onMessagesGet,
  onMessageUpdate
}
