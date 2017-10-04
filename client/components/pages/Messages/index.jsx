import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import api from '../../../api'
import {Routes} from '../../../routes'

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
    messages: []
  }

  deleteMessage(id) {
    api.deleteMessage(id)
      .then(() => {
        console.log('message deleted successfully')
      })
      .catch(err => {
        console.error('Error while deleting message with id =', id)
        throw err
      })
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

  componentWillMount() {
    this.fetchMessages()
  }

  render() {
    const {messages} = this.state

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
                  <DeleteButton type='button' onClick={this.deleteMessage.bind(this, message.id)}>Delete</DeleteButton>
                </Message>
              ))
            )
          }
        </Content>
      </Wrapper>
    )
  }
}
