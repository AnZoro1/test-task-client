export interface DataItem {
    id: number;
    name?: string;
    title?: string;
    description?: string;
    active: boolean;
    createdAt?: string;
    publishedAt?: string;
    [key: string]: any; // Дополнительные поля могут быть любыми
}