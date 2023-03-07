import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginImage from '../assets/login_image.png';

import '../assets/styles.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(false);
    // Send form data to Flask route
    fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle response data here
      if (data.message === 'login successful') {
        // Display success message to user
      } else if (data.message === 'username found, wrong password') {
        // Display error message to user
        setIsSubmit(true);
      } else if (data.message === 'username not found') {
        // Display error message to user
      }
    })
    .catch(error => console.error(error));
  }
  
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);
  
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
        {Object.keys(errors).length === 0 && isSubmit ? navigate('my_groups') : null}
          <div className="login-form">
            <div className="logo-container">
              <span className="my-3 mx-5 d-flex align-items-center gap-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                <span className="fs-2 text-primary"><strong>Study</strong>Kakis</span>
              </span>
            </div>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label className="login-label">Username</label>
              <input className="input-field"
                type="text"
                name="username"
                placeholder="Username" 
                value={setValues.username}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.username}</p>
            <div className="input-container">
              <label className="login-label">Password</label>
              <input className="input-field"
                type="password"
                name="password"
                placeholder="Password" 
                value={setValues.password}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.password}</p>
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