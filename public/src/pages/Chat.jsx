import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setisLoaded(true); //gets true when current user is loaded
    }
  },[]) 
  
  useEffect(() => {
    if(currentUser) {
      //console.log(currentUser);
      if(currentUser.isAvatarImageSet) {
        try{
          async function fetchData(){
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);  //so we have all the users in contacts
            
          }
          fetchData();
        } catch(err){
          console.log("Error fetching all users", err)
        }
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser])
  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className='container'>
        <Contacts
         contacts={contacts}
         currentUser={currentUser} 
         changeChat={handleChatChange}
        />
        
        { //loading Welcome component if we haven't selected any user to chat with and if we have selected then showing ChatContainer component
          isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )
        }
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-colums: 35% 65%;
    }
  }
  `;
export default Chat;