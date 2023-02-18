import React from 'react';
import { Dropdown } from 'bootstrap';
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
            <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown button
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
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