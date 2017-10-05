'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const dbManager = require('../dbManager')

module.exports = router

router.use(bodyParser.json())

router.get('/messages/:id', (req, res, next) => {
  const {id} = req.params
  const message = dbManager.getMessage(Number(id))
  if (message) {
    res.json(message)
  } else {
    next()
  }
})

// Update message
router.put('/messages/:id', (req, res, next) => {
  const message = req.body
  try {
    dbManager.updateMessage(message)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400)
  }
})

router.post('/messages/create', (req, res, next) => {
  const message = req.body
  try {
    const id = dbManager.createMessage(message)
    res.json({id})
  } catch (err) {
    res.sendStatus(400)
  }
})

router.get('/messages', (req, res, next) => {
  const messages = dbManager.getAllMessages()
  res.json({messages})
})
