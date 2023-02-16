import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
import LoginImage from '../assets/login_image.png';

import './loginPage.css';

const LoginPage = () => {

  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form>
          <div className="login-form">
            <h1>Login</h1>
            <div className="input-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username" />
            </div>
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password" />
            </div>
            <button className="login-button">LOGIN</button>
            <button className="signup-button" onClick={() => navigate('/register/')}>SIGN UP</button>
          </div>
        </form>
        <img src={LoginImage} alt="login-img" className="login-image" />
      </div>
    </div>
  );
}

export default LoginPage


/*
    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    console.log(values);
    */