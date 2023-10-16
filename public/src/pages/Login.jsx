import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import logo from"../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css" //defining css for toast (necessary)
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); //to prevent default behaviour i.e. page refresh
      if(handleValidation()){ //if validation is done properly
        console.log("in validation", loginRoute)
        const {password, username} = values;
        const {data} = await axios.post( loginRoute, {//so it will wait for the post request to be completed
          username,
          password,
          //now these 3 opbjects as posted to loginRoute, whose route will match with our server route and hence data is transferred to backend server
        }); //the response from the server will be stored in data variable
        if(data.status === false){
          toast.error(data.msg, toastOptions);
        }
        else {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));//once registered, storing user in localStorage
          navigate("/"); //if user is successfully registered then navigating it to home 
        }
      }
  }

  const handleValidation = () => {
      const {password, confirmPassword, username, email } = values; //i.e. we destructured all the values here
      if (password === ""){
        toast.error("Username and password are required", toastOptions);
          return false;
      } else if(username.length === "") {
          toast.error("Username and password are required", toastOptions);
          return false;
      } 
      return true;
  }
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])

  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className='brand'>
            <img src={logo} alt="Logo"/>
            <h1>snappy</h1>
          </div>
          <input 
            type="text" 
            placeholder="Username"
            name="username" 
            onChange={(e) => handleChange(e)}
            min = "3"
          />
          
          <input 
            type="password" 
            placeholder="Password"
            name="password" 
            onChange={(e) => handleChange(e)}
          />
          
          <button type="submit">Login</button>
          <span>
            Don't have an account?<Link to="/Register">Register now</Link>
          </span>
        </form>
      </FormContainer> 
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076; 
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1.4rem 1rem;
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
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
      }
    }
  }

`; 

export default Login