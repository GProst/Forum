'use strict'

const messages = require('./fakeDB')

module.exports = {
  getAllMessages() {
    return messages.map(message => ({header: message.header, id: message.id}))
  },

  getMessage(id) {
    return messages.find(message => message.id === id)
  },

  updateMessage(updatedMessage) {
    const index = messages.findIndex(message => message.id === updatedMessage.id)
    messages[index] = updatedMessage
  },

  deleteMessage(id) {
    const index = messages.findIndex(message => message.id === Number(id))
    messages.splice(index, 1)
  },

  createMessage(message) {
    const id = messages.length + 1
    message.id = id
    messages.push(message)
    return id
  }
}
