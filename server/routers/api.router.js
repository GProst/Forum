'use strict'

const express = require('express')
const router = express.Router()

module.exports = router

router.get('/messages/:id', (req, res, next) => {
  // if (!posts) { TODO: delete this
  //   next()
  // } else {
  //   res.json({data: posts})
  // }
})

router.get('/messages', (req, res, next) => {
  // if (!post) { TODO: delete this
  //   next()
  // } else {
  //   res.json({data: post})
  // }
})
