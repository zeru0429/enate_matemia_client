import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter } from 'react-router-dom'

import './index.css';
//components
import App from './App';

import reducer, { initialState } from "./utility/reducer";
import { StateProvider } from "./utility/stateprovider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter > 
      <StateProvider initialState={initialState} reducer={reducer}>
          <App />
      </StateProvider>
   </BrowserRouter>
  </React.StrictMode>
);


