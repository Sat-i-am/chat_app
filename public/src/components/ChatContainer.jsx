import React from 'react'
import styled from 'styled-components'

export default function ChatContainer({currentChat}) {
  return (
    <>
    {
        currentChat && <Container> 
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={currentChat.avatarImage}
                        alt="currentUser">
                        
                    </img>
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
        </div>
        <div className="chat-messages"></div>
        <div className="chat-input"></div>
    </Container>
    }
    </>
    
  )
}

const  Container = styled.div`
padding-top: 1rem;
.chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem;
    .user-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
            }
        }
        .username{
            h3{
                color: white;
            }
        }
    }
    
}

`;
