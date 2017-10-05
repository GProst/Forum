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
    return axios.put(`/api/messages/${message.id}`, message)
      .catch((err) => {
        throw err
      })
  },

  createMessage(message) {
    return axios.post('/api/messages/create', message)
      .then(response => {
        return response.data.id
      })
      .catch((err) => {
        throw err
      })
  }
}
