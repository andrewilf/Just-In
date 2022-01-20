import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router} from "react-router-dom"

const rootElement = document.getElementById('root');
ReactDOM.render(
     <Router>
    <App />
    </Router>
, rootElement
);

reportWebVitals();
