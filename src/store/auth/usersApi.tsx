import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
//   tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({baseUrl: 'https://rs-clone-tody.up.railway.app/'}),
  endpoints: (build) => ({
    //   getGoods: build.query({
    //       query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
    //       providesTags: (result) => result
    //         ? [
    //             ...result.map(({ id }) => ({ type: 'Products', id })),
    //             { type: 'Products', id: 'LIST' },
    //           ]
    //         : [{ type: 'Products', id: 'LIST' }],
    //   }),
      createUser: build.mutation({
          query: (body) => ({
              url: 'auth/register',
              method: 'POST',
              body,
          }),
        //   invalidatesTags: [{type: 'Products', id: 'LIST'}]
      }),
    //   deleteProduct: build.mutation({
    //       query: (id) => ({
    //           url: `goods/${id}`,
    //           method: 'DELETE',
    //       }),
    //     //   invalidatesTags: [{type: 'Products', id: 'LIST'}]
    //   })
  })
});

export const {useCreateUserMutation} = usersApi;