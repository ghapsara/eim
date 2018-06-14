import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Container = styled.div`
  margin-bottom: 50px;
  color: white;
  font-size: 16px;
  background: #272631;
  font-family: monospace;
`;

class Message extends React.Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <div>Eid Mubarak</div>
          <div>to All</div>
          <div>Fellow Muslim</div>
        </Container>
      </Wrapper>
    )
  }
}

export default Message;