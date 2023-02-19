import React from 'react'
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import App from './App'
import Register from './routes/Register';
import './index.css'
import SignIn from './routes/SignIn';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    errorElement:<ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/signin",
        element: <SignIn/>,
      },
    ],
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
