import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';

import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser }) {
    const [Messages, setMessages] = useState([]);

    useEffect(() => { //this is to getAllMessages
        if (currentUser) {
            const getmessages = async () => {
                try {
                    const response = await axios.post(getAllMessagesRoute, {
                        from: currentUser._id,
                        to: currentChat._id,
                    });
                   // console.log(response);
                    await setMessages(response.data);//storing the data we got from backend in Messages
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }
            getmessages(); 
        }
    }, [currentChat, currentUser]);
    //console.log(Messages);
    
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
    }

    return (
        <>
            {currentChat && <Container >
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                            <img src={currentChat.avatarImage} alt="currentUser" />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />
                </div>
                <div className="chat-messages">
                    {Messages.map((message, index) => (
                        <div key={index} className={`message ${message.fromSelf ? "sended" : "received"}`}>
                            <div className="content">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <ChatInput handleSendMsg={handleSendMsg} />
            </Container>}
        </>
    );
}

const  Container = styled.div`
padding-top: 1rem;
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
position: relative;
@media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-rows: 15% 70% 15%;
  }
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

.chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message{
        display: flex;
        align-items: center;
        .content{
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #d1d1d1
        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            background-color: #004953;
        }
    }
    .received{
        justify-content: flex-start;
        .content{
            background-color: #002D62;
        }
    }
}
  
`;
 