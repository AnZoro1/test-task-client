export interface PagesI {
    id: number;
    title: string;
    active: boolean;
    updatedAt: string;
    publishedAt: string;
}

export interface ErrorResponse {
    error: string;
}

export type ApiResponse = PagesI[] | ErrorResponse;
export type ChangePages = PagesI | ErrorResponse;

export interface pagesStateI {
    pending: boolean,
    pages: PagesI[],
    error: unknown
}

export interface SearchProps {
    search: string,
    active: string,
    modal: boolean,
    setModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}