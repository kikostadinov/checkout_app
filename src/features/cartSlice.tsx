import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../interfaces";
import { productsApi } from "./productsApi";

const initialState: ICartState = {
  items: [],
  totalAmount: 0,
  status: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
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

export default cartSlice.reducer;