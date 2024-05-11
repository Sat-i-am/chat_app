
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"


import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css" //defining css for toast (necessary)
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';

import logo1 from "../assets/avatarLogo/logo1.png"
import logo2 from "../assets/avatarLogo/logo2.png"
import logo3 from "../assets/avatarLogo/logo3.png"
import logo4 from "../assets/avatarLogo/logo4.png"

 

export default function SetAvatar() {
  
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const avatarArray = [logo1, logo2, logo3, logo4];

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
  },[])
  const setProfilePicture = async () => {
    if( selectedAvatar===undefined ){
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      //console.log(user);
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatarArray[selectedAvatar],
      });
       console.log(data);
      if( data.isSet) { 
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate('/');
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  }
  return (
    <div >
        <Container >
        <div className='title-container'>
          <h1>Pick and avatar as your profile picture</h1>
        </div>
        
          <div className="avatarArray">
        
              {avatarArray.map((avatar, index) => (
                <div onClick={()=>{
                    if(selectedAvatar===index){ //if we are clicking twice, it will deselect 
                      setSelectedAvatar(undefined);
                    } else{
                      setSelectedAvatar(index);
                    }
                  }} className={
                    `avatarContainer ${selectedAvatar===index?"selected":""}` 
                    }//this says that add selected class to the avatarContainer whose index matched with the element clicked
                >  
                <img  
                  key={index} 
                  src={avatar} 
                  alt={`avatarArray ${index}`} 
                  className="avatarLogo"
                />
                </div>
                
              ))}
            
          </div>
          <button className='submit-btn' onClick={setProfilePicture}>Set as the Profile Picture</button>
        </Container>; 
        <ToastContainer />
    </div>
  )
} 
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column; 
gap: 3rem;
background-color: #131324; 
height: 100vh;  
width: 100vw;

.loader { 
  max-inline-size: 100%;
}
.title-container{
  h1{
    color: white;
  }
}
.avatarArray {
  display: flex;
  flex-direction: row;
 
  
}
.avatarContainer {
  width: 130px; /* Set a fixed width */
  height: 130px; /* Set a fixed height */
  margin: 1rem; /* Add some spacing between images */
  transition: 0.3s ease-in-out;
  border: 0.4rem solid transparent;
  border-radius:50%;
  padding:5px;
}
.selected{
  border: 0.4rem solid #4e0eff;
}

.avatarLogo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
}
.submit-btn{
  
    background-color: #997af0;
    color: white;
    padding: 1rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem; 
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: #4e0eff;
  }
}
`;
