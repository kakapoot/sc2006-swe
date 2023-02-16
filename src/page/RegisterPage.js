import React from 'react';
import { useState } from 'react';
import LoginImage from '../assets/login_image.png'

import './registerPage.css';
import FormInput from '../component/FormInput';

const RegisterPage = () => {
    const [values, setValues] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const inputs = [
        {
            id:1,
            name:"name",
            type:"text",
            placeholder:"Name",
            errorMessage: "Please input",
            label:"Name",
        },
        {
            id:2,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage:"",
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
            <form className="loginForm" onSubmit={handleSubmit}>
                <h1>Create your account</h1>
                {inputs.map((input)=> (
                    <FormInput className= "loginFormInput"
                        key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}/>
                ))}

                <button className="loginButton">LOGIN</button>
                <button className="registerButton">REGISTER</button>
            </form>
            <img src={LoginImage} alt="login_image" className="loginImage" />
        </div>
    )
}

export default RegisterPage