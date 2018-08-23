import React from 'react';
import ReactDOM from 'react-dom';
//calling BrowserRouter
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
