import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import api from '../../../api'

import MessageTemplate from '../../templates/Message'

const Error = styled.div`
  color: red;
  font-weight: bold;
`

export default class MessagePage extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        status: PropTypes.string
      })
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    pending: true,
    message: null,
    error: null
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id)
    api.fetchMessage(id)
      .then(message => {
        this.setState({
          message,
          pending: false
        })
      })
      .catch(err => {
        this.setState({
          pending: false,
          error: `Error while fetching message with id = ${id}`
        })
        console.error()
        throw err
      })
  }

  render() {
    const disabled = !this.state.message
    const status = this.props.location.state && this.props.location.state.status
    return (
      this.state.error
        ? <Error>{this.state.error}</Error>
        : <MessageTemplate disabled={disabled} pending={this.state.pending} message={this.state.message} status={status} />
    )
  }
}
