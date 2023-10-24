 import React, { useEffect, useState } from 'react'
 import styled from 'styled-components'
 import Logo from '../assets/logo.svg'

 export default function Contacts({ contacts, currentUser, changeChat }) {
   
    //from the chat file we have all our users in contacts prop.
    const [currentUserName, setCurrentUserName] = useState(undefined);//this will tell which user is logged in
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined); //this will tell with whom user is chatting currently
    useEffect( () => {
        if(currentUser)  {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);

    };
    
    return (
    <>
    {
    currentUserImage && currentUserName && (
        <Container>
            <div className='brand'>
                <img src={Logo} alt="logo" />
                <h3>snappy</h3>
            </div>
            <div className='contacts'>
                {
                contacts.map((contact, index) => { //to display all contacts
                    return (
                        <div className={`contact ${
                            index === currentSelected ? "selected" : ""
                        }`}
                        key={index}
                        onClick={()=> changeCurrentChat(index, contact)} //so we can change the current chat by clicking new contact
                        >
                            <div className='avatar'>
                            <img  
                                src={contact.avatarImage} 
                                alt="avatar" 
                                className='contactImage'
                            />
                            </div>
                            <div className='username'>
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    )
                })
                } 
            </div>
            <div className="current-user">
            <div className='avatar'>
                <img  
                    src={currentUserImage} 
                    alt="avatar" 
                />
                </div>
                <div className='username'>
                    <h2>{currentUserName}</h2>
                </div>
            </div>
        </Container>
    ) 
    }
    </>
    )
 }
 const Container = styled.div`
 display: grid;
 grid-template-rows:10% 75% 15%;
 overflow: hidden;
 background-color: #080420;
 .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
        height: 2rem;
    }
    h3{
        color: white;
        text-transform: uppercase;
    }
 }
 .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.1rem;
    &::-webkit-scrollbar{
        width: 0.3rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.2rem;
            border-radius: 1rem;
        }
        
    }
    .contact{
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        margin-bottom: 2rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.3s ease-in-out;
        .avatar {
            img{
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
    .selected{
        background-color: #9186f3
    }
 }
 .current-user{
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar{
        img{
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color: white;
         }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
        gap: 0.5rem;
        .username{
            h2{
                font-size: 1rem;
            }
        }
      }
}
 `;
 