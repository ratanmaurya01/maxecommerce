// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../Firebase';
// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//     const querySnapshot = await getDocs(collection(db, 'products'));
//     return querySnapshot.docs.map((doc) => {
//       const data = doc.data();
//       return {
//         id: doc.id,
//         ...data,
//         createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null, // Convert Firestore Timestamp to ISO string
//       };
//     });
//   });
// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Add reducers if needed for other product-related actions
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { Timestamp } from 'firebase/firestore';



export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
       /// console.log('Firestore Data:', querySnapshot.docs.map(doc => doc.data())); // Check in console

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
                    : null, // If createdAt is a Timestamp, convert it; otherwise, set to null
            };
        });
        
        
        
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Ensure the error reaches Redux state
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

export const { updateProduct, deleteProduct } = productSlice.actions; // Export new actions
export default productSlice.reducer;
