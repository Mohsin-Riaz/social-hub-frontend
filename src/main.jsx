import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './App.jsx';
import { store } from './store.js';
//import './index.css'

// const base = !!import.meta.env.VITE_NODE_ENV ? '' : '/social-hub-frontend/';
// const basename = '/social-hub-frontend/';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/social-hub-frontend/">
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
