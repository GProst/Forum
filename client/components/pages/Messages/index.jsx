import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Portal from 'react-portal'

import api from '../../../api'
import {Routes} from '../../../routes'

import ModalContainer from '../../bricks/ModalContainer'
import DeleteModal from './DeleteModal'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 0;
`

const Content = styled.div`
  background-color: whitesmoke;
  padding: 20px 30px;
`

const Message = styled.div`
  margin: 30px 0;
  position: relative;
`

const MessageContent = styled(Link)`
  padding: 20px;
  cursor: pointer;
  color: black;
  display: block;
  text-decoration: none;
  background-color: white;
  
  :hover {
    color: black;
    background-color: #cfd6dc;
  }
`

const DeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  background-color: grey;
  color: white;
  cursor: pointer;
  
  :hover {
    background-color: red;
  }
`

export default class MessagesPage extends React.Component {
  state = {
    messages: [],
    portalIsOpen: false,
    selectedMessage: null
  }

  fetchMessages() {
    api.fetchMessages()
      .then(messages => {
        this.setState({messages})
      })
      .catch(err => {
        console.error('Error while fetching messages')
        throw err
      })
  }

  deleteMessage(message) {
    this.setState({
      portalIsOpen: true,
      selectedMessage: message
    })
  }

  onMessageDeleted = (id) => {
    const index = this.state.messages.findIndex(message => message.id === id)
    const updatedMessages = this.state.messages.slice()
    updatedMessages.splice(index, 1)
    this.setState({messages: updatedMessages})
  }

  onModalClose = () => {
    this.setState({portalIsOpen: false})
  }

  componentWillMount() {
    this.fetchMessages()
  }

  render() {
    const {messages, selectedMessage} = this.state

    return (
      <Wrapper>
        <Content>
          {messages.length === 0
            ? <h1>Fetching messages...</h1>
            : (
              messages.map(message => (
                <Message key={message.id}>
                  <MessageContent to={Routes.editMessage.path(message.id)}>
                    <h1>{message.header}</h1>
                  </MessageContent>
                  <DeleteButton type='button' onClick={this.deleteMessage.bind(this, message)}>Delete</DeleteButton>
                </Message>
              ))
            )
          }
        </Content>
        <Portal isOpened={this.state.portalIsOpen}>
          <ModalContainer>
            <DeleteModal onModalClose={this.onModalClose} onMessageDeleted={this.onMessageDeleted} message={selectedMessage} />
          </ModalContainer>
        </Portal>
      </Wrapper>
    )
  }
}
