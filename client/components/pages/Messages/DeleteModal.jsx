import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import api from '../../../api'

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  line-height: 1.5;
`

const Button = styled.button`
  width: 60px;
  height: 30px;
  cursor: pointer;
  
  ${props => props.disabled && `
  cursor: not-allowed;
  opacity: 0.5;
  `}
  
  ${props => !props.disabled && `
  :hover {
    background: grey;
    color: white;
  }
  `}

  :first-child {
    margin-right: 20px;
  }
`

const ButtonsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`

const Header = styled.h2`
  font-weight: 400;
`

const Error = styled.div`
  color: red;
  font-weight: bold;
`

export default class DeleteModal extends React.Component {
  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
    onMessageDeleted: PropTypes.func.isRequired,
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      header: PropTypes.string.isRequired
    })
  }

  state = {
    error: null,
    pending: false
  }

  deleteMessage(id) {
    this.setState({
      pending: true,
      error: null
    })
    api.deleteMessage(id)
      .then(() => {
        this.props.onMessageDeleted(id)
        this.props.onModalClose()
      })
      .catch(err => {
        console.error('Error while deleting message with id =', id)
        this.setState({
          pending: false
        })
        throw err
      })
  }

  render() {
    const {pending, error} = this.state
    const {header, id} = this.props.message

    return (
      <Wrapper>
        <Header>Delete message <b>'{header}'</b>?</Header>
        {pending && <h3>Processing...</h3>}
        {error && <Error>{error}</Error>}
        <ButtonsContainer>
          <Button type='button' onClick={this.props.onModalClose} disabled={pending}>Cancel</Button>
          <Button type='button' onClick={this.deleteMessage.bind(this, id)} disabled={pending}>Delete</Button>
        </ButtonsContainer>
      </Wrapper>
    )
  }
}
