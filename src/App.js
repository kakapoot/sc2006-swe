import React, { useContext } from 'react';
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
import { AuthContext } from './context/AuthContext';
import { PrivateRoute, PublicRoute } from './components/Route';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SWRConfig } from 'swr';
import PrivatePageLayout from './pages/PrivatePageLayout';

const App = () => {
  const { authState } = useContext(AuthContext)

  return (
    <div className="App">
      {!authState.isAuthLoaded && <LoadingSpinner />}

      {authState.isAuthLoaded &&
        <SWRConfig value={{ shouldRetryOnError: false }}>
          <BrowserRouter>
            <Routes>
              {/* TODO: automatic routing temporarily disabled until redirects are fixed */}
              {/* TODO: issue is that registering user is automatically logged in and redirected to private page without creating profile */}
              {/* <Route element={<PrivateRoute />}> */}
              <Route element={<PrivatePageLayout />}>
                <Route path='/my_groups' element={<MyGroupsPage />} />
                <Route path='/find_groups' element={<FindGroupsPage />} />
                <Route path='/study_areas' element={<StudyAreasPage />} />
                <Route path='/user/:username' element={<UserProfilePage />} />
                <Route path='/group/:groupId' element={<GroupProfilePage />} />
              </Route>
              {/* </Route> */}

              {/* <Route element={<PublicRoute />}> */}
              <Route path='/' element={<LoginPage />} />
              <Route path='/register/' element={<RegisterPage />} />
              <Route path='/create_profile' element={<ProfileCreationPage />} />
              {/* </Route> */}
            </Routes>
          </BrowserRouter>
        </SWRConfig>}
    </div >
  );
}

export default App;
