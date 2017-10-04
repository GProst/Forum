export const Routes = {
  messagesList: '/messages',
  editMessage: {
    template: '/messages/:id',
    path: (id) => `/messages/${id}`
  },
  createMessage: '/messages/new'
}
