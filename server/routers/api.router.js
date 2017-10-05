'use strict'

const winston = require('winston')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const dbManager = require('../db/manager')

module.exports = router

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
    .catch(err => {
      winston.error(err)
      res.sendStatus(400)
    })
})

// Update message
router.put('/messages/:id', (req, res, next) => {
  const message = req.body
  dbManager.updateMessage(message)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      winston.error(err)
      res.sendStatus(400)
    })
})

router.delete('/messages/:id', (req, res, next) => {
  const {id} = req.params
  dbManager.deleteMessage(id)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      winston.error(err)
      res.sendStatus(400)
    })
})

router.post('/messages/create', (req, res, next) => {
  const message = req.body
  dbManager.createMessage(message)
    .then(id => {
      res.json({id})
    })
    .catch(err => {
      winston.error(err)
      res.sendStatus(400)
    })
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
    .catch(err => {
      winston.error(err)
      res.sendStatus(400)
    })
})
