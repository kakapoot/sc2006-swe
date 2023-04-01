import React, { useContext } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import MyGroupsPage from './pages/groups/MyGroupsPage';
import StudyAreasPage from './pages/study_areas/StudyAreasPage';
import UserProfilePage from './pages/user/UserProfilePage';
import FindGroupsPage from './pages/groups/FindGroupsPage';
import GroupProfilePage from './pages/groups/GroupProfilePage';
import './App.css';
import { AuthContext } from './context/AuthContext';
import { PrivateRoute, PublicRoute } from './components/Route';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SWRConfig } from 'swr';
import PrivatePageLayout from './pages/PrivatePageLayout';
import PublicPageLayout from './pages/PublicPageLayout';
import NotFoundPage from './pages/NotFoundPage';
import GroupChatPage from './pages/groups/GroupChatPage';

const App = () => {
  const { authState } = useContext(AuthContext)

  return (
    <div className="App">
      {!authState.isAuthLoaded && <LoadingSpinner />}

      {authState.isAuthLoaded &&
        <SWRConfig value={{ shouldRetryOnError: false }}>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route element={<PrivatePageLayout />}>
                  <Route path='/my_groups' element={<MyGroupsPage />} />
                  <Route path='/find_groups' element={<FindGroupsPage />} />
                  <Route path='/study_areas' element={<StudyAreasPage />} />
                  <Route path='/user/:username' element={<UserProfilePage />} />
                  <Route path='/group/:groupId' element={<GroupProfilePage />} />
                  <Route path='/chat/:groupId' element={<GroupChatPage />} />
                </Route>
              </Route>

              <Route element={<PublicPageLayout />}>
                <Route element={<PublicRoute />}>
                  <Route path='/' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                </Route>
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </SWRConfig>}
    </div >
  );
}

export default App;
