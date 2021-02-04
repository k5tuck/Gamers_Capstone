import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react'
import axios from "axios";

function Login(props) {
  let history = useHistory();
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const processLogin = async (e) => {
    e.preventDefault();
    let user = {
      username,
      password
    }
    const resp = await axios.post('/api/login', user)
    console.log(resp)
    if(resp.status === 200){
    history.push('/member/home')
    }
  }


  
  return (
    <div>
      <h1 align="center">Welcome Please Sign In To Your Gamer's Account</h1>
      <br />

      <form onSubmit={processLogin}>
        <input
          type="text"
          name="username"
          autofocus
          placeholder="username/email"
          onChange={(e)=>{
            setUsername(e.target.value)
          }}
        />
        <br />
        <input type="password" name="password" onChange={(e)=>{
          setPassword(e.target.value)
        }}/>
        <br />
        <input type="submit" value="Login" />
      </form>
      <br />
      <div align="center">
        <p>
          If you need to Sign Up Please Click :
          
            <Link to="/signup">HERE</Link>
          
        </p>
      </div>
    </div>
  );
}

export default Login;
