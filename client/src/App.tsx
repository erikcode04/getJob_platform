import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import { AuthContext } from './services/checkAuth';

export default function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext === undefined) {
      console.log("AuthContext is undefined");
      return;
    }
    console.log("auth context", authContext);
  }, [authContext]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout />}>
          <Route index element={<Homepage  />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}