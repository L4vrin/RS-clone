import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ITask} from '../../models';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
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
      invalidatesTags: ['Tasks']
    }),
    getAllTasks: build.query<ITask[], void>({
      query: () => 'todos',
      providesTags: (result) =>
        result
          ? [...result.map(({_id}) => ({type: 'Tasks' as const, _id})), 'Tasks']
          : ['Tasks'],
    }),
<<<<<<< HEAD
    updateTodo: build.mutation({
      query: (todo) => ({
        url: `todos/${todo._id}`,
        method: 'PATCH',
        body: todo,
      }),
      transformResponse: (response: { data: ITask }) => response.data,
      transformErrorResponse: (
        response: { status: string | number },
      ) => response.status,
      invalidatesTags: ['Tasks'],
    }),
    deleteTodo: build.mutation({
      query: (todo) => ({
        url: `todos/${todo._id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: ITask }) => response.data,
      transformErrorResponse: (
        response: { status: string | number },
      ) => response.status,
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {useCreateTaskMutation, useGetAllTasksQuery, useUpdateTodoMutation, useDeleteTodoMutation} = tasksApi;
=======
  }),
});

export const {useCreateTaskMutation, useGetAllTasksQuery} = tasksApi;
>>>>>>> addTodoToServer
