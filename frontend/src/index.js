import App from './app/App';
import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './features/notification/context/NotificationContext';
import { AuthProvider } from './common/AuthContext';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <NotificationProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </NotificationProvider>
            </AuthProvider>
        </Provider>
    </React.StrictMode>,
);
