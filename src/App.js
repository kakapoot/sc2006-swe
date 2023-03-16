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
import { PrivateRoute, PublicRoute } from './components/Route';
import { HashRouter } from 'react-router-dom';
import { LoadingSpinner } from './components/LoadingSpinner';

const App = () => {
  const { authState } = useContext(AuthContext)

  return (
    <div className="App">
      {!authState.isAuthLoaded && <LoadingSpinner />}

      {authState.isAuthLoaded &&
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/my_groups' element={<MyGroupsPage />} />
              <Route path='/find_groups' element={<FindGroupsPage />} />
              <Route path='/study_areas' element={<StudyAreasPage />} />
              <Route path='/user/:username' element={<UserProfilePage />} />
              <Route path='/group/:groupId' element={<GroupProfilePage />} />
            </Route>

            <Route element={<PublicRoute />}>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register/' element={<RegisterPage />} />
              <Route path='/create_profile' element={<ProfileCreationPage />} />
            </Route>
          </Routes>
        </BrowserRouter>}
    </div>
  );
}

export default App;
