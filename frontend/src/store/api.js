import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Exercise endpoints
const buildExerciseEndpoints = (builder) => ({
    fetchAllExercises: builder.query({
        query: () => 'exercises',
    }),
    fetchExerciseById: builder.query({
        query: (id) => `exercises/${id}`,
    }),
    fetchAllHintsByExerciseId: builder.query({
        query: (exerciseId) => `exercises/${exerciseId}/hints`,
    }),
    updateExerciseById: builder.mutation({
        query: ({ id, exercise }) => ({
            url: `exercises/${id}`,
            method: 'PUT',
            body: exercise,
        }),
    }),
    deleteExerciseById: builder.mutation({
        query: (id) => ({
            url: `exercises/${id}`,
            method: 'DELETE',
        }),
    }),
    createExercise: builder.mutation({
        query: (exerciseData) => ({
            url: 'exercises',
            method: 'POST',
            body: exerciseData,
        }),
    }),
});

// User endpoints
const buildUserEndpoints = (builder) => ({
    signupUser: builder.mutation({
        query: (userData) => ({
            url: 'users/register',
            method: 'POST',
            body: userData,
        }),
    }),
    loginUser: builder.mutation({
        query: (userData) => ({
            url: 'users/login',
            method: 'POST',
            body: userData,
        }),
    }),
    fetchCurrentUser: builder.query({
        query: () => 'users/me',
    }),
    updateCurrentUser: builder.mutation({
        query: (userData) => ({
            url: 'users/me',
            method: 'PUT',
            body: userData,
        }),
    }),
    deleteCurrentUser: builder.mutation({
        query: () => ({
            url: 'users/me',
            method: 'DELETE',
        }),
    }),
});

// Badge endpoints
const buildBadgeEndpoints = (builder) => ({
    fetchAllBadges: builder.query({
        query: () => 'badges',
    }),
    fetchBadgeById: builder.query({
        query: (id) => `badges/${id}`,
    }),
    // Admin only
    createBadge: builder.mutation({
        query: (badgeData) => ({
            url: 'badges',
            method: 'POST',
            body: badgeData,
        }),
    }),
    // Admin only
    updateBadgeById: builder.mutation({
        query: ({ id, badgeData }) => ({
            url: `badges/${id}`,
            method: 'PUT',
            body: badgeData,
        }),
    }),
    // Admin only
    deleteBadgeById: builder.mutation({
        query: (id) => ({
            url: `badges/${id}`,
            method: 'DELETE',
        }),
    }),
});

// User-badge endpoints
const buildUserBadgeEndpoints = (builder) => ({
    fetchUserBadges: builder.query({
        query: ({ userId }) => `user-badges/${userId}`,
    }),
    // Admin only
    assignBadgeToUser: builder.mutation({
        query: ({ badgeId, userId }) => ({
            url: `user-badges`,
            method: 'POST',
            body: { badgeId, userId },
        }),
    }),
});

// Category endpoints
const buildCategoryEndpoints = (builder) => ({
    fetchAllCategories: builder.query({
        query: () => 'categories',
    }),
    fetchCategoryById: builder.query({
        query: (id) => `categories/${id}`,
    }),
    fetchCategoriesByExerciseId: builder.query({
        query: (exerciseId) => `categories/${exerciseId}/exercises`,
    }),
    // Admin only
    createCategory: builder.mutation({
        query: (categoryData) => ({
            url: 'categories',
            method: 'POST',
            body: categoryData,
        }),
    }),
    // Admin only
    updateCategoryById: builder.mutation({
        query: ({ id, categoryData }) => ({
            url: `categories/${id}`,
            method: 'PUT',
            body: categoryData,
        }),
    }),
    // Admin only
    deleteCategoryById: builder.mutation({
        query: (id) => ({
            url: `categories/${id}`,
            method: 'DELETE',
        }),
    }),
});

// Combine all the endpoints into a single API slice
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        ...buildExerciseEndpoints(builder),
        ...buildUserEndpoints(builder),
        ...buildBadgeEndpoints(builder),
        ...buildCategoryEndpoints(builder),
        ...buildUserBadgeEndpoints(builder),
    }),
});

// Export all the hooks for each endpoint
export const {
    // Exercise
    useFetchAllExercisesQuery,
    useFetchExerciseByIdQuery,
    useFetchAllHintsByExerciseIdQuery,
    useUpdateExerciseByIdMutation,
    useDeleteExerciseByIdMutation,
    useCreateExerciseMutation,
    // User
    useSignupUserMutation,
    useLoginUserMutation,
    useFetchCurrentUserQuery,
    useUpdateCurrentUserMutation,
    useDeleteCurrentUserMutation,
    // Badge
    useFetchAllBadgesQuery,
    useFetchBadgeByIdQuery,
    useCreateBadgeMutation,
    useUpdateBadgeByIdMutation,
    useDeleteBadgeByIdMutation,
    // Category
    useFetchAllCategoriesQuery,
    useFetchCategoryByIdQuery,
    useFetchCategoriesByExerciseIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryByIdMutation,
    useDeleteCategoryByIdMutation,
    // User-badge
    useFetchUserBadgesQuery,
    useAssignBadgeToUserMutation,
} = api;
