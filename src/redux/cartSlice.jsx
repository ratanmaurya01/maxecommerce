
import { createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cartItems';

const loadCartFromStorage = () => {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : []; // Parse JSON, or return an empty array if nothing is stored
};

const saveCartToStorage = (items) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(), // Load initial cart state from localStorage
    },

    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            saveCartToStorage(state.items); // Save updated cart to localStorage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            saveCartToStorage(state.items); // Update localStorage
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToStorage([]); // Clear localStorage
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
