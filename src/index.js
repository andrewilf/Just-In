import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom"

const rootElement = document.getElementById('root');
ReactDOM.render(
  //<React.StrictMode>
     <Router>
    <App />
    </Router>
  //</React.StrictMode>,
//  document.getElementById('root')
, rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
