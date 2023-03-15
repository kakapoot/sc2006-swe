import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import MyGroupsPage from './pages/MyGroupsPage';
import StudyAreasPage from './pages/StudyAreasPage';
import UserProfilePage from './pages/UserProfilePage';
import FindGroupsPage from './pages/FindGroupsPage';
import GroupProfilePage from './pages/GroupProfilePage';
import './App.css';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          {/* TODO: add router guards based on user authentication */}
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register/' element={<RegisterPage />} />
            <Route path='/create_profile' element={<ProfileCreationPage />} />
            <Route path='/my_groups' element={<MyGroupsPage />} />
            <Route path='/find_groups' element={<FindGroupsPage />} />
            <Route path='/study_areas' element={<StudyAreasPage />} />
            <Route path='/user/:username' element={<UserProfilePage />} />
            <Route path='/group/:groupId' element={<GroupProfilePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
