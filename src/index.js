import './css/body.css';
import './css/app.css';
import './css/header.css';

import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('app')
);