import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countriesnow.space/api/v0.1/' }),
  tagTypes: ['Countries'],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => 'countries',
      providesTags: ['Countries'],
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;