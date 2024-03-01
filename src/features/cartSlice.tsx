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
  // Save preselected products to the cart. Dev only!
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
        state.totalAmount = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      }
    );
  },
});

export default cartSlice.reducer;