import { createSelector, createSlice } from '@reduxjs/toolkit';
import { countriesApi } from './countriesApi';
import { ICountry } from '../interfaces';

interface ICountriesState {
  items: ICountry[];
  selectedCountry: string;
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string | undefined;
}

const initialState: ICountriesState = {
  items: [],
  selectedCountry: '',
  status: null,
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      countriesApi.endpoints.getCountries.matchFulfilled,
      (state, action) => {
        state.items = action.payload.data;
      }
    );
  },
});

export const selectCitiesOfSelectedCountry = createSelector(
  [(state) => state.countries.items, (state) => state.countries.selectedCountry],
  (countries, selectedCountry) => {
    const country = countries.find((country: ICountry) => country.country === selectedCountry);
    return country ? country.cities : [];
  }
);

export const { selectCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
