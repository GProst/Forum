import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {Routes} from '../../routes'

export default class MessageTemplate extends React.Component {
  static propTypes = {
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      header: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }),
    pending: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  render() {
    const {message} = this.props
    const disabled = this.props.disabled || this.props.pending

    return (
      <div disabled={disabled}>
        {message
          ? (
            <div>
              <h1>{message.header}</h1>
              <hr />
              <p>{message.body}</p>
              <Link to={Routes.messagesList}>Go to messages list</Link>
            </div>
          )
          : <h2>Fetching message data...</h2>
        }
      </div>
    )
  }
}
