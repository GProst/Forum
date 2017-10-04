import messagesList from './fake-messages-list'

export default {
  fetchMessages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve(messagesList)
      }, 2000)
    })
      .catch((err) => {
        throw err
      })
  },
  fetchMessage(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve({
          id,
          header: `Message #${id}`,
          body: `This is a body of message #${id}`
        })
      }, 2000)
    })
      .catch((err) => {
        throw err
      })
  },
  deleteMessage(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve(true)
      }, 2000)
    })
      .catch((err) => {
        throw err
      })
  }
}
