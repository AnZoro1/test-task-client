export interface ProductOptionsI {
    size: string;
    amount: number;
}

export interface ProductI {
    id: number;
    name: string;
    options: ProductOptionsI;
    active: boolean;
    createdAt?: string;
}

export interface ErrorResponse {
    error: string;
}

export type ApiResponse = ProductI[] | ErrorResponse;
export type ChangeProduct = ProductI | ErrorResponse;

export interface productStateI {
    pending: boolean,
    products: ProductI[],
    error: unknown
}

export interface SearchProps {
    search: string,
    active: string,
    modal: boolean,
    setModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}