import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SelectableTag } from '../components/Tag'

import '../assets/styles.css';

const ProfileCreationPage = () => {

  const tagData = {
    studyInterests: ["Mathematics", "Physics", "Biology", "Chemistry", "English", "Art", "Music", "Geography", "History", "Computer Science", "Business", "Engineering"],
    educationLevels: ["Secondary", "Polytechnic", "Pre-university / JC", "University", "Post-graduate", "Doctoral"],
    learningStyles: ["Visual", "Auditory", "Reading / Writing", "Kinesthetic"],
  }

  const location = useLocation();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: location.state.username,
    gender: "",
    birthday: "",
    organization: "",
    aboutMe: "",
    studyInterests: [],
    educationLevels: [],
    learningStyles: [],
  })

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleSelectTag = (selectedTagType, selectedTag) => {
    values[selectedTagType].some(tag => tag === selectedTag)
        ? setValues({ ...values, [selectedTagType]: values[selectedTagType].filter(tag => tag !== selectedTag) })
        : setValues({ ...values, [selectedTagType]: [...values[selectedTagType], selectedTag] })
  }

  const handleIsSelected = (selectedTagType, selectedTag) => {
      return values[selectedTagType].some(tag => tag === selectedTag)
  }

  const formatTagType = (text) => {
    return text
        // insert a space between each word
        .replace(/([A-Z])/g, ' $1')
        // uppercase first character of each word
        .replace(/^./, (str) => str.toUpperCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    // Send form data to Flask route
    fetch('http://localhost:5000/create_profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: values.username,
      gender: values.gender,
      birthday: values.birthday,
      organization: values.organization,
      aboutme: values.aboutMe,
      studyInterests: values.studyInterests,
      educationLevels: values.educationLevels,
      learningStyles: values.learningStyles,
    })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle response data here
      if (data.message === 'username is taken') {
        // Display error message to user
      } 
      else if (data.message === 'email is taken') {
        // Display error message to user
      } 
      else if (data.message === 'email is invalid') {
        // Display error message to user
      }
      else { //data.message = 'Registration Successful'
        // Display success 
      }
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);

  const validate = (values) => {
    const errors = {};
    if (!values.gender) {
      errors.gender = "Please select a gender!";
    }
    if (!values.birthday) {
      errors.birthday = "Birthday is required!";
    }
    if (!values.organization) {
      errors.organization = "Organization is required!";
    }
    if(values.studyInterests.length === 0) {
      errors.studyInterests = "Please select at least one subject!"
    }
    if(values.educationLevels.length === 0) {
      errors.educationLevels = "Please select your education level!"
    }
    if(values.learningStyles.length === 0) {
      errors.learningStyles = "Please select your preferred learning style!"
    }

    return errors;
  };

  // to redirect navigate
  return (
    <div className="create-profile-page">
      {Object.keys(errors).length === 0 && isSubmit ? (navigate('/')) : null}
      <div className="create-profile-form-container">
        <form onSubmit={handleSubmit}>
          <div className="create-profile-form">
            <h1 className="create-profile-heading">Tell us more about yourself</h1>
            <div className="left-to-right-block">
              <div className="input-container-dropdown-gender">
                <label className="create-profile-label">Gender</label>
                <select className='input-gender' name="gender" onChange={handleChange}>
                  <option className='input-gender-option' value=""></option>
                  <option className='input-gender-option' value="male">Male</option>
                  <option className='input-gender-option' value="female">Female</option>
                  <option className='input-gender-option' value="non-binary">Non-binary</option>
                </select>
                <p className="create-profile-input-error-gender"><strong>{errors.gender}</strong></p>
              </div>
              <div className="input-container-dropdown-birthday">
                <label className="create-profile-label">Birthday</label>
                  <input className='input-birthday' 
                    type="date" 
                    name="birthday"
                    min="1980-01-01" max="2020-12-31" 
                    value={setValues.birthday}
                    onChange={handleChange}/>
                <p className="create-profile-input-error-birthday"><strong>{errors.birthday}</strong></p>
              </div>          
            </div>
            <div className="create-profile-input-container">
              <label className="create-profile-label">Organization</label>
                <input className="input-field"
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={setValues.organization}
                  onChange={handleChange}/>
            </div>
            <p className="create-profile-input-error"><strong>{errors.organization}</strong></p> 
            <div className="create-profile-input-container">
              <label className="create-profile-label">About Me</label>
                <textarea className="text-area-box"
                  name="aboutMe" 
                  placeholder="Enter a basic description here."
                  value={setValues.aboutMe}
                  onChange={handleChange}/>
            </div>
            <div className="create-profile-input-container">
              {Object.entries(tagData).map(([tagType, tags]) => (
                <div key={tagType} className="create-profile-label">
                  <span><strong>{formatTagType(tagType)}</strong></span>

                  <div className="create-profile-tag-container">
                    {tags.map((tag) =>
                      <div key={tag}><SelectableTag name={tag} onSelectTag={() => { handleSelectTag(tagType, tag) }} isSelected={handleIsSelected(tagType, tag)} /></div>
                  )}
                  </div>

                  <p className="create-profile-input-error-tag">{errors[tagType]}</p> 
                </div>
              ))}
            </div>
            <button className="create-profile-finish-button">FINISH</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileCreationPage