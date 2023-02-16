import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register/' element={<RegisterPage />}/>
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
