import axios from "axios";
import { ChangePages, PagesI, ApiResponse } from "./types";

const API_URL = 'http://localhost:4000'


export const getPages = async (): Promise<ApiResponse> => {
    try {
        const { data } = await axios.get<PagesI[]>(`${API_URL}/pages`)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'unknown error');
    }
}


export const changePages = async (id: number, title: string): Promise<ChangePages> => {
    try {
        const { data } = await axios.patch<PagesI>(`${API_URL}/pages/${id}`, { title });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'unknown error');
    }
}