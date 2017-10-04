import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'

import {Routes} from '../../routes'
import api from '../../api'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 0;
`

const inputCSS = css`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  max-height: 500px;
  border: 1px solid grey;
  outline: none;
  
  ${props => props.disabled && css`
  opacity: 0.7;
  background: #ececec;
  `}
`

const HeadInput = styled.input`
  ${inputCSS};
  height: 50px;
  font-size: 24px;
  padding: 10px 20px;
`

const BodyInput = styled.textarea`
  ${inputCSS};
  height: 200px;
  min-height: 200px;
  font-size: 16px;
  padding: 20px;
`

const ButtonSection = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  padding: 5px 10px;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  border: 1px solid grey;
  background: #ececec;
  
  ${props => !props.disabled && css`
  :hover {
    background: seagreen;
    color: white;
  }
  `}
  
  ${props => props.disabled && css`
  cursor: not-allowed;
  opacity: 0.7;
  background: #ececec;
  `}
`

const DeleteButton = styled(Button)`
  margin-left: auto;
  margin-right: 40px;

  ${props => !props.disabled && css`
  :hover {
    background: red;
    color: white;
  }
  `}
`

const StatusSection = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

const Error = styled.div`
  color: red;
  font-weight: bold;
`

const Status = styled.div`
  color: #166086;
  font-weight: bold;
`

export default class MessageTemplate extends React.Component {
  static propTypes = {
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      header: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }),
    pending: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['update', 'create']).isRequired,
    status: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    type: 'update'
  }

  state = {
    headerInitialValue: this.props.message ? this.props.message.header : '',
    headerValue: this.props.message ? this.props.message.header : '',
    bodyInitialValue: this.props.message ? this.props.message.body : '',
    bodyValue: this.props.message ? this.props.message.body : '',
    disabled: false,
    error: null,
    status: this.props.status
  }

  saveChanges = () => {
    this.setState({
      disabled: true,
      error: null,
      status: 'Updating message...'
    })
    const {headerValue, bodyValue} = this.state
    api.updateMessage({
      id: this.props.message.id,
      header: headerValue,
      body: bodyValue
    })
      .then(() => {
        this.setState({
          disabled: false,
          headerInitialValue: headerValue,
          bodyInitialValue: bodyValue,
          status: 'Message updated successfully'
        })
      })
      .catch(err => {
        console.error()
        this.setState({
          disabled: false,
          error: `Error while updating message with id = ${this.props.message.id}`
        })
        throw err
      })
  }

  onInputChange(field, event) {
    const {value} = event.target
    this.setState({
      [field]: value,
      status: null
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({
        headerValue: nextProps.message.header,
        bodyValue: nextProps.message.body
      })

      if (!this.props.message) {
        this.setState({
          headerInitialValue: nextProps.message.header,
          bodyInitialValue: nextProps.message.body
        })
      }
    }
  }

  render() {
    const {message} = this.props
    const disabled = this.state.disabled || this.props.disabled || this.props.pending
    const {headerValue, bodyValue, headerInitialValue, bodyInitialValue, error, status} = this.state

    const notUpdated = message && (headerValue === headerInitialValue && bodyValue === bodyInitialValue)

    return (
      <Wrapper>
        {message
          ? (
            <div>
              <h1>Header:</h1>
              <HeadInput disabled={disabled} value={headerValue} onChange={this.onInputChange.bind(this, 'headerValue')} />
              <h2>Body:</h2>
              <BodyInput disabled={disabled} value={bodyValue} onChange={this.onInputChange.bind(this, 'bodyValue')} />
              <ButtonSection>
                <Link to={Routes.messagesList}>Back to messages list</Link>
                <DeleteButton type='button' disabled={disabled} onClick={this.deleteMessage}>
                  DeleteMessage
                </DeleteButton>
                {this.props.type === 'update'
                  ? (
                    <Button type='button' disabled={notUpdated || disabled} onClick={this.saveChanges}>
                      Save changes
                    </Button>
                  )
                  : (
                    <Button type='button' disabled={notUpdated || disabled} onClick={this.createMessage}>
                      Create message
                    </Button>
                  )
                }
              </ButtonSection>
              <StatusSection>
                {error && <Error>{error}</Error>}
                {status && <Status>{status}</Status>}
              </StatusSection>
            </div>
          )
          : <h2>Fetching message data...</h2>
        }
      </Wrapper>
    )
  }
}
