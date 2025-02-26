import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connect from './pages/Connect';
import Login from './pages/Login';
import Homepage from './pages/Homepage';



const App: React.FC = () => {

  return (
      <Routes>
        <Route path="/connect" element={<Connect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
  );
};

export default App;
