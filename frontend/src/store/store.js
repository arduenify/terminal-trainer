import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import exerciseReducer from './exerciseSlice';

export default configureStore({
    reducer: {
        exercise: exerciseReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
