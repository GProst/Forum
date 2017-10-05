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
    return axios.delete(`/api/messages/${id}`)
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
    return axios.post('/api/messages', message)
      .then(response => {
        return response.data.id
      })
      .catch((err) => {
        throw err
      })
  }
}
