'use strict'

const path = require('path')
const del = require('del')

const initialMessages = require('./initialMessages')

const dbFile = path.join(__dirname, 'messages.sqlite3')
del.sync([dbFile])

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbFile)

db.serialize(() => {
  db.run(`
  CREATE TABLE Messages (
    id  INTEGER  PRIMARY KEY  AUTOINCREMENT  NOT NULL,
    header  TEXT  NOT NULL,
    body  TEXT  NOT NULL
  )
  `)

  const stmt = db.prepare('INSERT INTO Messages (header, body) VALUES (?, ?)')
  initialMessages.forEach(({header, body}) => {
    stmt.run(header, body)
  })
  stmt.finalize()
})

db.close()
