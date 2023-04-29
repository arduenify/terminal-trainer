import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { logger } from 'redux-logger';

export default configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, logger),
});
