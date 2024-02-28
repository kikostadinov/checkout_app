import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../interfaces";
import { productsApi } from "./productsApi";

const initialState: ICartState = {
  items: [],
  status: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(...action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  },
  // Save preselected products to the cart
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;