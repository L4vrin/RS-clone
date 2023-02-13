import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rs-clone-tody.up.railway.app/',
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem('token');
      headers.set('authorization', `${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useCreateTaskMutation} = tasksApi;
