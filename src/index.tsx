import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Import your Redux store
import App from './App';

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the app with React 18's createRoot API
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
