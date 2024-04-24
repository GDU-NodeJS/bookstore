// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {BrowserRouter} from 'react-router-dom';
// import RouterCustom from './router';
// import  './styles/styles.scss'
// import App from './App';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App/>
//   </BrowserRouter>
//   );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);