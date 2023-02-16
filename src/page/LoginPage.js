import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginImage from '../assets/login_image.png';

import './loginPage.css';

const LoginPage = () => {

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
    setIsSubmit(true);
  }
  /*
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);
  */
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

  const navigate = useNavigate();

  return (
    <div className="login-page">
      {Object.keys(errors).length === 0 && isSubmit ? (<div>placeholder for sign in success</div>) : null}
      <pre>{JSON.stringify(values, undefined, 2)} FOR DEBUG</pre>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <h1>Login</h1>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password" 
                value={setValues.password}
                onChange={handleChange}/>
            </div>
            <p>{errors.password}</p>
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
    */