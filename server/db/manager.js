'use strict'

const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, '../messages.sqlite3'))

module.exports = {
  getAllMessages() {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, header FROM Messages', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  },

  getMessage(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Messages WHERE id = ${id}`, (err, row) => {
        if (err) {
          reject(err)
        }
        resolve(row)
      })
    })
  },

  updateMessage(updatedMessage) {
    return new Promise((resolve, reject) => {
      const {header, body, id} = updatedMessage
      db.run(`
        UPDATE Messages
        SET header = '${header}', body = '${body}'
        WHERE id = ${id}
      `, (err) => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  },

  deleteMessage(id) {
    return new Promise((resolve, reject) => {
      db.run(`
        DELETE
        FROM Messages
        WHERE id = ${id}
      `, (err) => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  },

  createMessage(message) {
    return new Promise((resolve, reject) => {
      const {header, body} = message
      db.serialize(() => {
        db.run(`
          INSERT
          INTO Messages (header, body)
          VALUES('${header}', '${body}')
        `, (err) => {
          if (err) {
            reject(err)
          }
        })
      })

      db.get('SELECT last_insert_rowid()', (err, row) => {
        if (err) {
          reject(err)
        }
        resolve(row['last_insert_rowid()'])
      })
    })
  }
}
