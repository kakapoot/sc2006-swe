import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import LoginPage from './page/LoginPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
