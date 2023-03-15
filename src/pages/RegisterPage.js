import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginImage from '../assets/login_image.png';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';

import '../assets/styles.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';

const RegisterPage = () => {

  const navigate = useNavigate();
  /*navigator to shift to an email validator in final build*/

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({});
  const [takenErrors, setTakenErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(values));

    try {
      setIsLoading(true)
      // Create user in database
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      if (data.message !== "registration successful") {
        console.log(data.message)
        setTakenErrors(taken(data.message))
      }
      else {
        // Create account in Firebase Auth
        setIsSuccessful(true);
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        await updateProfile(auth.currentUser, { displayName: values.username })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const taken = (string) => {
    const takenErrors = {};
    if (string === "username is taken") {
      takenErrors.username = "Username is taken!"
    }
    if (string === "email is taken") {
      takenErrors.email = "Email is taken!"
    }

    return takenErrors
  }

  /*to add email regex*/
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
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

  useEffect(() => {
    if (!isLoading && isSuccessful) {
      navigate('/create_profile', { state: { username: values.username } })
    }
  }, [isLoading, isSuccessful])


  return (
    <div className="register-page">
      <div className="register-form-container">
        {isLoading &&
          <LoadingSpinner />}

        {!isLoading && <form onSubmit={handleSubmit}>
          <div className="register-form">
            <h1 className="register-heading">Create your Account</h1>
            <div className="input-container">
              <label className="register-label">Name</label>
              <input className="input-field"
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange} />
            </div>
            <p className="input-error">{errors.name}</p>
            <div className="input-container">
              <label className="register-label">Username</label>
              <input className="input-field"
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange} />
            </div>
            <p className="input-error">{[errors.username, takenErrors.username]}</p>
            <div className="input-container">
              <label className="register-label">Email</label>
              <input className="input-field"
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange} />
            </div>
            <p className="input-error">{[errors.email, takenErrors.email]}</p>
            <div className="input-container">
              <label className="register-label">Password</label>
              <input className="input-field"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange} />
            </div>
            <p className="input-error">{errors.password}</p>
            <div className="input-container">
              <label className="register-label">Confirm Password</label>
              <input className="input-field"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange} />
            </div>
            <p className="input-error">{errors.confirmPassword}</p>
            <button className="register-button">REGISTER</button>
          </div>
        </form>}
        <img src={LoginImage} alt="login-img" className="login-image" />
      </div>
    </div>
  );
}

export default RegisterPage
