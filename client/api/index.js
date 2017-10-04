import axios from 'axios'

export default {
  fetchMessages() {
    return axios.get('/api/messages')
      .then(response => response.data.messages)
      .catch((err) => {
        throw err
      })
  },

  fetchMessage(id) {
    return axios.get(`/api/messages/${id}`)
      .then(response => response.data)
      .catch((err) => {
        throw err
      })
  },

  deleteMessage(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve(true)
      }, 500)
    })
      .catch((err) => {
        throw err
      })
  },

  updateMessage(message) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve(true)
      }, 500)
    })
      .catch((err) => {
        throw err
      })
  },

  createMessage(message) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve(13)
      }, 500)
    })
      .catch((err) => {
        throw err
      })
  }
}
