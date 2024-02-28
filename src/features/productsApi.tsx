import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products?limit=5',
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;