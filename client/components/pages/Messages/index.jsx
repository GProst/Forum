import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Portal from 'react-portal'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'

import api from '../../../api'
import {Routes} from '../../../routes'

import ModalContainer from '../../bricks/ModalContainer'
import DeleteModal from '../../bricks/DeleteModal'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: whitesmoke;
  padding: 20px 30px;
`

const Message = styled.div`
  margin: 15px 0;
  align-self: stretch;
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

const CreateButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid grey;
  outline: none;
  background: #d8f9f8;
  
  :hover {
    background: grey;
    color: white;
  }
`

const Fetching = styled.h1`
  align-self: flex-start;
`

const connector = connect(
  (state) => ({}),
  (dispatch) => ({
    createNewMessage() {
      dispatch(push(Routes.createMessage))
    }
  })
)

class MessagesPage extends React.Component {
  static propTypes = {
    createNewMessage: PropTypes.func.isRequired
  }

  state = {
    messages: [],
    portalIsOpen: false,
    selectedMessage: null,
    messagesFetched: false
  }

  fetchMessages() {
    api.fetchMessages()
      .then(messages => {
        this.setState({
          messages,
          messagesFetched: true
        })
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
    const {messages, selectedMessage, messagesFetched} = this.state

    return (
      <Wrapper>
        <Content>
          {messagesFetched && <CreateButton onClick={this.props.createNewMessage}>Create new message</CreateButton>}
          {!messagesFetched
            ? <Fetching>Fetching messages...</Fetching>
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

export default connector(MessagesPage)
