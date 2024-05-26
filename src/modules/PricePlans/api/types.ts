

export interface PricePlansI {
    id: number;
    description: string;
    active: boolean;
    createdAt: string;
    removedAt: string;
}

export interface ErrorResponse {
    error: string;
}

export type ApiResponse = PricePlansI[] | ErrorResponse;
export type ChangePricePlans = PricePlansI | ErrorResponse;

export interface pricePlansStateI {
    pending: boolean,
    pricePlans: PricePlansI[],
    error: unknown
}

export interface SearchProps {
    search: string,
    active: string,
    modal: boolean,
    setModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}