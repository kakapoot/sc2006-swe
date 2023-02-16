import React from 'react';
import { useState } from 'react';
import LoginImage from '../assets/login_image.png'

import './styles.css';
import FormInput from '../component/FormInput';

const LoginPage = () => {
    const [values, setValues] = useState({
        username:"",
        password:"",
    })

    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage: "Invalid username!",
            label:"Username",
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"Invalid password",
            label:"Password",
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    console.log(values);

    return (
        <div className="loginPage">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {inputs.map((input)=> (
                    <FormInput className= "loginFormInput"
                        key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}/>
                ))}

                <button className="loginButton">LOGIN</button>
                <button className="signupButton">SIGN UP</button>
            </form>
            <img src={LoginImage} alt="login_image" className="loginImage" />
        </div>
    )
}

export default LoginPage