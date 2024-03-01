import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { productsApi } from './features/productsApi.tsx';
import { countriesApi } from './features/countriesApi.tsx';
import cartReducer from './features/cartSlice.tsx';
import countriesReducer from './features/countriesSlice.tsx';
import userReducer from './features/userSlice.tsx';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    countries: countriesReducer,
    user: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, countriesApi.middleware),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
