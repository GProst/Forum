'use strict'

const express = require('express')
const router = express.Router()
const dbManager = require('../dbManager')

module.exports = router

router.get('/messages/:id', (req, res, next) => {
  const {id} = req.params
  const message = dbManager.getMessage(Number(id))
  if (message) {
    res.json(message)
  } else {
    next()
  }
})

router.get('/messages', (req, res, next) => {
  const messages = dbManager.getAllMessages()
  res.json({messages})
})
