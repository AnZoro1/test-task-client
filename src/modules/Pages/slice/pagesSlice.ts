import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPages, changePages } from "../api/api";
import { ApiResponse, ChangePages, pagesStateI, PagesI } from "../api/types";


const initialState: pagesStateI = {
    pending: false,
    pages: [],
    error: false
}

export const getPagesReq = createAsyncThunk('get/pages', async (_, thunkAPI) => {
    try {
        const data: ApiResponse = await getPages();

        if ('error' in data) {
            return thunkAPI.rejectWithValue(data.error);
        }

        const pages: PagesI[] = data;
        return thunkAPI.fulfillWithValue(pages);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const sendPagesReq = createAsyncThunk('mutation/pages', async ({ id, text }: { id: number, text: string }, thunkAPI) => {
    try {
        const title = text
        const res: ChangePages = await changePages(id, title);
        if ('error' in res) {
            return thunkAPI.rejectWithValue(res.error);
        }

        const pages: PagesI = res;
        return thunkAPI.fulfillWithValue(pages);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const pagesSlice = createSlice({
    name: "pagesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPagesReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(getPagesReq.fulfilled, (state, action) => {
                state.pending = false
                state.error = false
                state.pages = action.payload
            })
            .addCase(getPagesReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
            .addCase(sendPagesReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(sendPagesReq.fulfilled, (state, action) => {
                state.pending = false;
                state.error = false;
                const updatedPages = action.payload as PagesI;
                state.pages = state.pages.map((page) => {
                    if (page.id === updatedPages.id) {
                        return updatedPages;
                    }
                    return page;
                });
            })
            .addCase(sendPagesReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
    }
})

export default pagesSlice.reducer