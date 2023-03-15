import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import MyGroupsPage from './pages/MyGroupsPage';
import StudyAreasPage from './pages/StudyAreasPage';
import UserProfilePage from './pages/UserProfilePage';
import FindGroupsPage from './pages/FindGroupsPage';
import GroupProfilePage from './pages/GroupProfilePage';
import './App.css';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { username } = useContext(AuthContext)
  useEffect(() => {
    console.log(username)
  }, [username])

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={username ? <Navigate to="/my_groups" /> : <LoginPage />} />
          <Route path='/register/' element={username ? <Navigate to="/my_groups" /> : <RegisterPage />} />
          <Route path='/create_profile' element={username ? <Navigate to="/my_groups" /> : <ProfileCreationPage />} />
          <Route path='/my_groups' element={username ? <MyGroupsPage /> : <Navigate to="/" />} />
          <Route path='/find_groups' element={username ? <FindGroupsPage /> : <Navigate to="/" />} />
          <Route path='/study_areas' element={username ? <StudyAreasPage /> : <Navigate to="/" />} />
          <Route path='/user/:username' element={username ? <UserProfilePage /> : <Navigate to="/" />} />
          <Route path='/group/:groupId' element={username ? <GroupProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
