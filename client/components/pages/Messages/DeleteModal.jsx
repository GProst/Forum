import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 30px;
`

export default class DeleteModal extends React.Component {
  render() {
    return (
      <Wrapper>
        Delete message?
      </Wrapper>
    )
  }
}
