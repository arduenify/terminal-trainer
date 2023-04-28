import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../common/apiClient';

export const fetchAllExercises = createAsyncThunk(
    'exercise/fetchAll',
    async () => {
        const response = await apiClient.get('/exercises');

        return response;
    },
);

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        data: [],
        error: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllExercises.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllExercises.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchAllExercises.rejected, (state, action) => {
                state.error =
                    action.error?.responseJson || action.error.message;
                state.status = 'failed';
            });
    },
});

export default exerciseSlice.reducer;
