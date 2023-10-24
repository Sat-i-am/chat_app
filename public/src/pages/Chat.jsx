import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  },[]) 
  // useEffect(() => {
  //   console.log(contacts);
  // },[contacts]); //this was to check if all users were successfully fetched into contacts
  useEffect(() => {
    if(currentUser) {
      //console.log(currentUser);
      if(currentUser.isAvatarImageSet) {
        try{
          async function fetchData(){
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            //console.log(response.data);
            setContacts(response.data);  //so we have all the users in contacts
            //console.log(contacts);
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
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
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