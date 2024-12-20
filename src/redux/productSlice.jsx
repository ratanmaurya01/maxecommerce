
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { Timestamp } from 'firebase/firestore';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (querySnapshot.empty) {
            console.warn('No products found in Firestore.');
        }

        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt instanceof Timestamp
                    ? data.createdAt.toDate().toISOString()
                    : null, 
            };
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {

          // Add product to Redux store
          addProduct(state, action) {
            state.items.push(action.payload);
        },


        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.items = [];
        },

        // Update product in Redux store
        updateProduct(state, action) {
            const index = state.items.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload; // Replace product with updated data
            }
        },
        
        // Delete product in Redux store
        deleteProduct(state, action) {
            state.items = state.items.filter((product) => product.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {addProduct,  updateProduct, deleteProduct } = productSlice.actions; // Export new actions
export default productSlice.reducer;
