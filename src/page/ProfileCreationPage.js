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
    about_me: "",
  })

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }
  // to redirect navigate
  return (
    <div className="create-profile-page">
      <div className="create-profile-form-container">
        <form>
          <div className="create-profile-form">
            <h1 className="create-profile-heading">Tell us more about yourself</h1>
            <div className="left-to-right-block">
              <div className="input-field-dropdown">
                <label className="create-profile-label">Gender</label>
                <select className='input-gender'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>
              <div className="input-field-dropdown-birthday">
                <label className="create-profile-label">Birthday</label>
                  <input className='input-birthday' 
                    type="date" 
                    name="birthday"
                    min="1980-01-01" max="2020-12-31" 
                    value={setValues.birthday}
                    onChange={handleChange}/>
              </div>          
            </div>
            <div className="create-profile-input-field">
              <label className="create-profile-label">Organization</label>
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={setValues.organization}
                  onChange={handleChange}/>
            </div>
            <div className="create-profile-input-field">
              <label className="create-profile-label">About Me</label>
                <textarea className="text-area-box"
                  name="about_me" 
                  placeholder="Enter a basic description here."
                  value={setValues.about_me}
                  onChange={handleChange}/>
            </div>
            <div className="create-profile-input-field">
              <label className="create-profile-label">Subject</label>
              <div className="create-profile-cb-button-container">
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">MATHEMATICS</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">PHYSICS</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">BIOLOGY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">CHEMISTRY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">ENGLISH</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">ART</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">MUSIC</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">GEOGRAPHY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">HISTORY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">COMPUTER SCIENCE</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">BUSINESS</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">ENGINEERING</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="create-profile-input-field">
              <label className="create-profile-label">Education Level</label>
              <div className="create-profile-cb-button-container">
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">SECONDARY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">POLYTECHNIC</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">PRE-UNIVERSITY / JC</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">UNIVERSITY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">POST-GRADUATE</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">DOCTORAL</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="create-profile-input-field">
              <label className="create-profile-label">Learning Style</label>
              <div className="create-profile-cb-button-container">
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">VISUAL</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">AUDITORY</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">READING / WRITING</span>
                  </label>
                </div>
                <div className="create-profile-cb-button">
                  <label className="create-profile-cb-label">
                    <input type="checkbox" className="create-profile-cb-label-input"/>
                      <span className="create-profile-cb-label-span">KINESTHETIC</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="create-profile-finish-button" onClick={() => navigate('/login/')}>FINISH</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileCreationPage