import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx';
import Loading from './components/Loading'


ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <Router>
            <App />
        </Router>
    </Suspense>
    , document.getElementById('root'));

