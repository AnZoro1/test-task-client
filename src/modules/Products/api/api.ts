import axios from "axios";
import { ProductI } from "./types";
import { ApiResponse } from "./types";
import { ChangeProduct } from "./types";

const API_URL = 'http://localhost:4001'


export const getProducts = async (): Promise<ApiResponse> => {
    try {
        const { data } = await axios.get<ProductI[]>(`${API_URL}/products`)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'unknown error');
    }
}


export const changeProducts = async (id: number, name: string): Promise<ChangeProduct> => {
    try {
        const { data } = await axios.patch<ProductI>(`${API_URL}/products/${id}`, { name });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'unknown error');
    }
}