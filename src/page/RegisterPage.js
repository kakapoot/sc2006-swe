import React from 'react';
//import { useState } from 'react';
import LoginImage from '../assets/login_image.png';

import './registerPage.css';

const RegisterPage = () => {

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form>
          <div className="register-form">
            <h1>Create your Account</h1>
            <div className="input-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name" />
            </div>
            <div className="input-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username" />
            </div>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email" />
            </div>
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password" />
            </div>
            <div className="input-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password" />
            </div>
            <button className="register-button">REGISTER</button>
          </div>
        </form>
        <img src={LoginImage} alt="login-img" className="login-image" />
      </div>
    </div>
  );
}

export default RegisterPage
