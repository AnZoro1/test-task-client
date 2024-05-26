import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeProducts, getProducts } from "../api/api";
import { ApiResponse, ChangeProduct, productStateI } from "../api/types";
import { ProductI } from "../api/types";

const initialState: productStateI = {
    pending: false,
    products: [],
    error: false
}

export const getProductsReq = createAsyncThunk('get/products', async (_, thunkAPI) => {
    try {
        const data: ApiResponse = await getProducts();

        if ('error' in data) {
            return thunkAPI.rejectWithValue(data.error);
        }

        const products: ProductI[] = data;
        return thunkAPI.fulfillWithValue(products);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const sendProductsReq = createAsyncThunk('mutation/products', async ({ id, text }: { id: number, text: string }, thunkAPI) => {
    try {
        const name = text
        const res: ChangeProduct = await changeProducts(id, name);
        if ('error' in res) {
            return thunkAPI.rejectWithValue(res.error);
        }

        const products: ProductI = res;
        return thunkAPI.fulfillWithValue(products);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productsSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(getProductsReq.fulfilled, (state, action) => {
                state.pending = false
                state.error = false
                state.products = action.payload
            })
            .addCase(getProductsReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
            .addCase(sendProductsReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(sendProductsReq.fulfilled, (state, action) => {
                state.pending = false;
                state.error = false;
                const updatedProduct = action.payload as ProductI;
                state.products = state.products.map((product) => {
                    if (product.id === updatedProduct.id) {
                        return updatedProduct;
                    }
                    return product;
                });
            })
            .addCase(sendProductsReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
    }
})

export default productsSlice.reducer