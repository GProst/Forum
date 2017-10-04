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
    const index = messages.findIndex(message => message.id === id)
    messages.splice(1, index)
  },

  createMessage(message) {
    const id = messages.length + 1
    message.id = id
    messages.push(message)
    return id
  }
}
