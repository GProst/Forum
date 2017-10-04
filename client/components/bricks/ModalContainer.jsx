import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
`

const Content = styled.div`
  background: white;
`

export default class ModalContainer extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <Wrapper>
        <Content>
          {this.props.children}
        </Content>
      </Wrapper>
    )
  }
}
