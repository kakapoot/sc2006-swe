import React, { useContext } from 'react';
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { updateProfile, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { SelectableTag, formatTagType, handleIsSelected, handleSelectTag, useTags } from '../components/Tag'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';

const RegisterPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "female",
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
  const [takenErrors, setTakenErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { queueToast } = useContext(ToastContext)

  const navigate = useNavigate()

  const { data: tagData, error, isLoading: tagDataIsLoading } = useTags()

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleRegisterSubmit = async () => {
    const errorResults = validate(values)
    setErrors(errorResults);

    // Send request with form data to server if form is valid
    if (Object.keys(errorResults).length === 0) {
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
          setTakenErrors(taken(data.message))
          queueToast("Error creating account, please check all input details")
        }
        else {
          setTakenErrors({})

          // Create account in Firebase Auth
          await createUserWithEmailAndPassword(auth, values.email, values.password)

          // Updating profile does not trigger onAuthStateChanged
          // But we want to update the auth state, so sign user out
          const user = auth.currentUser
          await signOut(auth)
          await updateProfile(user, { displayName: values.username })

          queueToast("Created account successfully")

          // Redirect to login page
          navigate("/")
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      queueToast("Error creating account, please check all input details")
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
    } else if (values.password.length < 8 || !passwordRegex.test(values.password)) {
      errors.password = "Password must contain 8 or more characters, at least one uppercase letter, one number, and one symbol!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password does not match!";
    }
    if (!values.birthday) {
      errors.birthday = "Birthday is required!";
    }
    if (!values.organization) {
      errors.organization = "Organization is required!";
    }

    return errors;
  };


  return (
    <>
      {/* Content */}
      <div className="col p-5 m-5 d-flex flex-column">
        <div className="container">
          <div className="d-flex flex-column gap-5">
            {/* Header */}
            <h2><strong>Create your StudyKakis account</strong></h2>

            {/* Form */}
            {/* Account Login Details */}
            <form className="d-flex flex-column gap-3">
              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="username"><strong>Username</strong></label>
                <input type="text" value={values.username} onChange={handleInputChange} className="form-control" name="username" placeholder="Username" />
                <span className="text-danger"><small>{[errors.username, takenErrors.username]}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="text" value={values.email} onChange={handleInputChange} className="form-control" name="email" placeholder="Email" />
                <span className="text-danger"><small>{[errors.email, takenErrors.email]}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" value={values.password} onChange={handleInputChange} className="form-control" name="password" placeholder="Password" />
                <span className="text-danger"><small>{errors.password}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="confirmPassword"><strong>Confirm password</strong></label>
                <input type="password" value={values.confirmPassword} onChange={handleInputChange} className="form-control" name="confirmPassword" placeholder="Confirm password" />
                <span className="text-danger"><small>{errors.confirmPassword}</small></span>
              </div>

              {/* Profile Details */}
              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" value={values.name} onChange={handleInputChange} className="form-control" name="name" placeholder="Name" />
                <span className="text-danger"><small>{errors.name}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="gender"><strong>Gender</strong></label>
                <select value={values.gender} onChange={handleInputChange} className="form-select" name="gender">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="birthday"><strong>Birthday</strong></label>
                <input type="date" value={values.birthday} onChange={handleInputChange} min="1980-01-01" max="2020-12-31" name="birthday" />
                <span className="text-danger"><small>{errors.birthday}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="organization"><strong>Organization</strong></label>
                <input type="text" value={values.organization} onChange={handleInputChange} className="form-control" name="organization" placeholder="Organization" />
                <span className="text-danger"><small>{errors.organization}</small></span>
              </div>

              <div className="form-group d-flex flex-column w-100">
                <label htmlFor="description"><strong>Description</strong></label>
                <textarea value={values.description} onChange={handleInputChange} rows="4" className="form-control" name="description" placeholder="Enter a description about yourself..."></textarea>
              </div>

              {/* Tags */}
              {tagDataIsLoading && <LoadingSpinner />}
              {tagData && Object.entries(tagData).map(([tagType, tags]) => (
                <div key={tagType} className="d-flex flex-column align-items-start">
                  <span><strong>{formatTagType(tagType)}</strong></span>

                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag) =>
                      <div key={tag}><SelectableTag name={tag} onSelectTag={() => { handleSelectTag(values, setValues, tagType, tag) }} isSelected={handleIsSelected(values, tagType, tag)} /></div>
                    )}
                  </div>
                </div>
              ))}
            </form>

            {/* Register button */}
            {isLoading && <LoadingSpinner />}

            {!isLoading && <div className="d-flex flex-column gap-4">
              <button onClick={handleRegisterSubmit} className="btn btn-primary text-light p-3 text-uppercase">
                <span>Register</span>
              </button>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage
