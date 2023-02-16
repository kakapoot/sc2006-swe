import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginImage from '../assets/login_image.png';

import './registerPage.css';

const RegisterPage = () => {

  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);
  /*to edit validate*/
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
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
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password!";
    } else if (values.confirmPassword != values.password) {
      errors.confirmPassword = "Password does not match!";
    }

    return errors;
  };

  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form onSubmit={handleSubmit}>
          <div className="register-form">
            <h1>Create your Account</h1>
            <div className="input-field">
              <label>Name</label>
              <input
                type="text"
                name="fullname"
                placeholder="Name"
                value={setValues.fullname}
                onChange={handleChange}/>
            </div>
            <p>{errors.fullname}</p>
            <div className="input-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={setValues.username}
                onChange={handleChange}/>
            </div>
            <p>{errors.username}</p>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={setValues.email}
                onChange={handleChange}/>
            </div>
            <p>{errors.email}</p>
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={setValues.password}
                onChange={handleChange}/>
            </div>
            <p>{errors.password}</p>
            <div className="input-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={setValues.confirmPassword}
                onChange={handleChange}/>
            </div>
            <p>{errors.confirmPassword}</p>
            <button className="register-button">REGISTER</button>
          </div>
        </form>
        <img src={LoginImage} alt="login-img" className="login-image" />
      </div>
    </div>
  );
}

export default RegisterPage
