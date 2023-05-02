import App from './app/App';
import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoaderProvider } from './features/modernLoader/context';

import { NotificationProvider } from './features/notification/context/NotificationContext';

import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <NotificationProvider>
                <LoaderProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </LoaderProvider>
            </NotificationProvider>
        </Provider>
    </React.StrictMode>,
);
