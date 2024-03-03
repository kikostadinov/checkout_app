import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../interfaces";
import { productsApi } from "./productsApi";

const initialState: ICartState = {
  items: [],
  totalAmount: 0,
  promoCode: null,
  status: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    }
  },
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

export const { setPromoCode } = cartSlice.actions;

export default cartSlice.reducer;