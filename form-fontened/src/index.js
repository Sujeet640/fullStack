import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Form from './Form';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ViewFormData from './ViewFormData';
import DeletedData from './DeletedData';

const root = ReactDOM.createRoot(document.getElementById('root'));

let router = createBrowserRouter([
  {
    path:"/:id?",
    element:<Form/>
  },
  {
    path:"/view-form-data",
    element:<ViewFormData/>
  },
  {
    path:"/recycle-bin-page",
    element:<DeletedData/>
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
