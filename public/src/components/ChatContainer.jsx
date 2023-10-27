import React from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';

export default function ChatContainer({currentChat}) {
  const handleSendMsg = async(msg) => {
    alert(msg);
  }
    return (
    <>
    {
        currentChat && <Container >  
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
            <Logout />
        </div>
        <Messages className="messages"></Messages>
        
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
    }
    </>
    
  )
}

const  Container = styled.div`
padding-top: 1rem;
position: relative;
.chat-header{
    display: flex;
    position: relative;
    justify-content: space-between;
    border-radius: 4px;
    background-color: #1B1D57;
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
 