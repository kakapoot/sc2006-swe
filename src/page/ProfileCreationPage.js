import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './profileCreationPage.css';

const ProfileCreationPage = () => {

  return (
    <div className="create-profile-page">
      <div className="create-profile-form-container">
        <form>
          <div className="create-profile-form">
            <h1 className="create-profile-heading">Tell us more about yourself</h1>
            <label>Gender</label>
            <select>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
            <label>Birthday</label>
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