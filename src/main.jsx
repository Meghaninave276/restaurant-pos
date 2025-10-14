// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {Provider} from 'react-redux'
// import store from './store/store.js'
// import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(

//   <Provider store={store}>
//     <App/>
//   </Provider>

// )


// import { StrictMode } from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// // import {Provider} from 'react-redux'
// // import store from './store/store.js'

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
   
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";  // if you have global CSS

// ✅ This wraps your entire app with BrowserRouter (already done in App.jsx)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




