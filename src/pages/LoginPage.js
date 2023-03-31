import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingSpinner } from '../components/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("")

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleLoginSubmit = async () => {
    const errorResults = validate(values)
    setErrors(errorResults);

    try {
      setIsLoading(true)
      // Send request with form data to server if form is valid
      if (Object.keys(errorResults).length === 0) {
        // Sign in user in Firebase Authentication
        await signInWithEmailAndPassword(auth, values.email, values.password)
        setLoginError("")
      }
    } catch (error) {
      console.log(error)
      setLoginError("Incorrect login details were entered, or no user exists with that email!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = () => {
    navigate('/register')
  }


  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  return (
    <>
      {/* Content */}
      <div className="col p-5 m-5 d-flex flex-column">
        <div className="container">
          <div className="d-flex flex-column gap-5">
            {/* Logo */}
            <span className="d-flex align-items-center gap-3 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              <span className="fs-1"><strong>Study</strong>Kakis</span>
            </span>

            {/* Header */}
            <h2><strong>Login</strong></h2>

            {/* Form */}
            <form className="d-flex flex-column gap-3">
              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="text" value={values.email} onChange={handleInputChange} className="form-control" name="email" placeholder="Email" />
                <span className="text-danger"><small>{errors.email}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" value={values.password} onChange={handleInputChange} className="form-control" name="password" placeholder="Password" />
                <span className="text-danger"><small>{errors.password}</small></span>
              </div>

              <span className="text-danger text-break"><small>{loginError}</small></span>
            </form>

            {/* Buttons */}
            {isLoading && <LoadingSpinner />}

            {!isLoading && <div className="d-flex flex-column gap-4">
              <button onClick={handleLoginSubmit} className="btn btn-primary text-light p-3 text-uppercase">
                <span>Login</span>
              </button>
              <button onClick={handleRegisterSubmit} className="btn btn-danger text-light p-3 text-uppercase">
                <span>Register</span>
              </button>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage