import React from 'react';
import styled from 'styled-components';
import Robot from "../assets/robot.gif"

export default function Welcome({currentUser}) {
  return (
  <Container>
    <img src={Robot} alt="Robot" />
    <h1>
        Welcome, <span>{currentUser.username}!</span>
    </h1>
    <h3>Please select contact to start chat</h3>
  </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
img{
    height: 20rem;
}
span {
    color: #4e00ff
}
`;