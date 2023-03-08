import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginImage from '../assets/login_image.png';

import '../assets/styles.css';

const RegisterPage = () => {

  const navigate = useNavigate();
  /*navigator to shift to an email validator in final build*/

  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    // Send form data to Flask route
    fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle response data here
      if (data.message === 'username is taken') {
        // Display error message to user
      } 
      else if (data.message === 'email is taken') {
        // Display error message to user
      } 
      else if (data.message === 'email is invalid') {
        // Display error message to user
      }
      else { //data.message = 'Registration Successful'
        // Display success 
       // fetch('http://localhost:5000/create_profile?username=' + encodeURIComponent(values.username))
       navigate('/create_profile',{state: {username: values.username }});
      }
      navigate('/create_profile',{state: {username: values.username }});
    }) 
    .catch(error => console.error(error)); 
  }

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);

  /*to add email regex*/
  const validate = (values) => {
    const errors = {};
    if (!values.fullname) {
      errors.fullname = "Name is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } 
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8){
      errors.password = "Password must contain 8 or more characters!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter, one number, and one symbol.";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password does not match!";
    }

    return errors;
  };

  
  return (
    <div className="register-page">
      {Object.keys(errors).length === 0 && isSubmit ? (navigate('/create_profile')) : null}
      <div className="register-form-container">
        <form onSubmit={handleSubmit}>
          <div className="register-form">
            <h1 className="register-heading">Create your Account</h1>
            <div className="input-container">
              <label className="register-label">Name</label>
              <input className="input-field"
                type="text"
                name="fullname"
                placeholder="Name"
                value={setValues.fullname}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.fullname}</p>
            <div className="input-container">
              <label className="register-label">Username</label>
              <input className="input-field"
                type="text"
                name="username"
                placeholder="Username"
                value={setValues.username}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.username}</p>
            <div className="input-container">
              <label className="register-label">Email</label>
              <input className="input-field"
                type="email"
                name="email"
                placeholder="Email"
                value={setValues.email}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.email}</p>
            <div className="input-container">
              <label className="register-label">Password</label>
              <input className="input-field"
                type="password"
                name="password"
                placeholder="Password"
                value={setValues.password}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.password}</p>
            <div className="input-container">
              <label className="register-label">Confirm Password</label>
              <input className="input-field"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={setValues.confirmPassword}
                onChange={handleChange}/>
            </div>
            <p className="input-error">{errors.confirmPassword}</p>
            <button className="register-button">REGISTER</button>
          </div>
        </form>
        <img src={LoginImage} alt="login-img" className="login-image" />
      </div>
    </div>
  );
}

export default RegisterPage
 