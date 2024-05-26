import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePricePlans, getPricePlans } from "../api/api";
import { ApiResponse, ChangePricePlans, pricePlansStateI, } from "../api/types";
import { PricePlansI } from "../api/types";

const initialState: pricePlansStateI = {
    pending: false,
    pricePlans: [],
    error: false
}

export const getPricePlansReq = createAsyncThunk('get/pricePlans', async (_, thunkAPI) => {
    try {
        const data: ApiResponse = await getPricePlans();

        if ('error' in data) {
            return thunkAPI.rejectWithValue(data.error);
        }

        const pricePlans: PricePlansI[] = data;
        return thunkAPI.fulfillWithValue(pricePlans);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const sendPricePlansReq = createAsyncThunk('mutation/pricePlans', async ({ id, text }: { id: number, text: string }, thunkAPI) => {
    try {
        const description = text
        const res: ChangePricePlans = await changePricePlans(id, description);
        if ('error' in res) {
            return thunkAPI.rejectWithValue(res.error);
        }

        const pricePlans: PricePlansI = res;
        return thunkAPI.fulfillWithValue(pricePlans);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const pricePlansSlice = createSlice({
    name: "pricePlansSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPricePlansReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(getPricePlansReq.fulfilled, (state, action) => {
                state.pending = false
                state.error = false
                state.pricePlans = action.payload
            })
            .addCase(getPricePlansReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
            .addCase(sendPricePlansReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(sendPricePlansReq.fulfilled, (state, action) => {
                state.pending = false;
                state.error = false;
                const updatedpricePlan = action.payload as PricePlansI;
                state.pricePlans = state.pricePlans.map((pricePlan) => {
                    if (pricePlan.id === updatedpricePlan.id) {
                        return updatedpricePlan;
                    }
                    return pricePlan;
                });
            })
            .addCase(sendPricePlansReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
    }
})

export default pricePlansSlice.reducer