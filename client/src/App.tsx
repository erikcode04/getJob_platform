import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Connect from './pages/Connect';
import Login from './pages/Login';
import Homepage from './pages/Homepage';

const routes: RouteObject[] = [
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Homepage",
    element: <Homepage />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;