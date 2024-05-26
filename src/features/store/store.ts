import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsSlice from "../../modules/Products/slice/productsSlice";
import pricePlansSlice from "../../modules/PricePlans/slice/pricePlansSlice";
import pagesSlice from "../../modules/Pages/slice/pagesSlice";


export const store = configureStore({
    reducer: {
        productsSlice,
        pricePlansSlice,
        pagesSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch
export const useAppDispatch: () => Appdispatch = useDispatch