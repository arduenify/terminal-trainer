import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { logger } from 'redux-logger';
import loadingReducer, { loadingMiddleware } from './loadingSlice';

export default configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware,
            logger,
            loadingMiddleware,
        ),
});
