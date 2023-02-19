import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './profileCreationPage.css';

const ProfileCreationPage = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    gender: "", //to implement setvalue for <select>
    birthday: "",
    organization: "",
  })

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="create-profile-page">
      <div className="create-profile-form-container">
        <form>
          <div className="create-profile-form">
            <h1 className="create-profile-heading">Tell us more about yourself</h1>
            <div className="left-to-right-block">
              <div className="input-field-dropdown">
                <label className="create-profile-label">Gender</label>
                <select>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>
              <div className="input-field-dropdown">
                <label className="create-profile-label">Birthday</label>
                  <input 
                    type="date" 
                    name="birthday"
                    min="1980-01-01" max="2020-12-31" 
                    value={setValues.birthday}
                    onChange={handleChange}/>
              </div>          
            </div>
            
            <label>Organization</label>
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={setValues.organization}
                onChange={handleChange}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileCreationPage

/*
<label>Birthday</label>
<label>Organization</label>
<label>About Me</label>
<label>Subject</label>
<label>Education Level</label>
<label>Learning Style</label>
*/