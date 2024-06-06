import axios from "axios";
import { PricePlansI } from "./types";
import { ApiResponse } from "./types";
import { ChangePricePlans } from "./types";

const API_URL = 'http://localhost:4001'


export const getPricePlans = async (): Promise<ApiResponse> => {
    try {
        const { data } = await axios.get<PricePlansI[]>(`${API_URL}/pricePlans`)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'unknown error');
    }
}


export const changePricePlans = async (id: number, description: string): Promise<ChangePricePlans> => {
    try {
        const { data } = await axios.patch<PricePlansI>(`${API_URL}/pricePlans/${id}`, { description });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'unknown error');
    }
}