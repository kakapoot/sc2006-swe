import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SelectableTag, formatTagType, handleIsSelected, handleSelectTag } from '../components/Tag'
import { useTags } from '../components/Tag';

import '../assets/styles.css';
import { LoadingSpinner } from '../components/LoadingSpinner';

const ProfileCreationPage = () => {

  // TODO : description
  // TODO : redirect user to this page if they have not created their profile

  const location = useLocation();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: location.state.username,
    gender: "",
    birthday: "",
    organization: "",
    description: "",
    tags: {
      subjects: [],
      educationLevels: [],
      learningStyles: [],
      regions: [],
    }
  })

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: tagData, error, isLoading: tagDataIsLoading } = useTags()


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    setIsLoading(true)

    // Send form data to Flask route
    fetch('http://localhost:5000/create_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle response data here
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }

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

    return errors;
  };

  // to redirect navigate
  return (
    <div className="create-profile-page">
      {!isLoading && Object.keys(errors).length === 0 && isSubmit ? (navigate('/')) : null}

      <div className="create-profile-form-container">
        {isLoading &&
          <LoadingSpinner />}

        {!isLoading && <form onSubmit={handleSubmit}>
          <div className="create-profile-form">
            <h1 className="create-profile-heading">Tell us more about yourself</h1>
            <div className="left-to-right-block">
              <div className="input-container-dropdown-gender">
                <label className="create-profile-label">Gender</label>
                <select className='input-gender' name="gender" onChange={handleChange}>
                  <option className='input-gender-option' value=""></option>
                  <option className='input-gender-option' value="male">Male</option>
                  <option className='input-gender-option' value="female">Female</option>
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
                  onChange={handleChange} />
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
                onChange={handleChange} />
            </div>
            <p className="create-profile-input-error"><strong>{errors.organization}</strong></p>
            <div className="create-profile-input-container">
              <label className="create-profile-label">Description</label>
              <textarea className="text-area-box"
                name="description"
                placeholder="Enter a basic description here."
                value={setValues.description}
                onChange={handleChange} />
            </div>
            <div className="create-profile-input-container">

              {tagDataIsLoading && <LoadingSpinner />}
              {tagData && Object.entries(tagData).map(([tagType, tags]) => (
                <div key={tagType} className="create-profile-label">
                  <span><strong>{formatTagType(tagType)}</strong></span>

                  <div className="create-profile-tag-container">
                    {tags.map((tag) =>
                      <div key={tag}><SelectableTag name={tag} onSelectTag={() => { handleSelectTag(values, setValues, tagType, tag) }} isSelected={handleIsSelected(values, tagType, tag)} /></div>
                    )}
                  </div>

                  <p className="create-profile-input-error-tag">{errors[tagType]}</p>
                </div>
              ))}
            </div>
            <button className="create-profile-finish-button">FINISH</button>
          </div>
        </form>}
      </div>
    </div>
  )
}

export default ProfileCreationPage