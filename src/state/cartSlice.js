import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product.uuid === action.payload.product.uuid
      );
      if (existingProduct) {
        existingProduct.count =
          existingProduct.count + action.payload.product.count;
      } else {
        state.cart = [...state.cart, action.payload.product];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.uuid !== action.payload.uuid
      );
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.uuid === action.payload.uuid) {
          product.count++;
        }
        return product;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.uuid === action.payload.uuid && product.count > 1) {
          product.count--;
        }
        return product;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
