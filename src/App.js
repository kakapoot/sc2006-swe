import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ProfileCreationPage from './page/ProfileCreationPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register/' element={<RegisterPage />}/>
          <Route path='/create_profile' element={<ProfileCreationPage />}/>
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
