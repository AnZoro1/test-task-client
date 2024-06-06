
import { DataItem } from "../modules/shared/Table/types";

export default function getTitle(data: DataItem[]): string {
    if (!data || data.length === 0) {
        return '';
    }
    const item = data[1];
    if (item.name) return 'Name';
    if (item.description) return 'Description';
    if (item.title) return 'Title';
    if (item.subject) return 'Subject';
    if (item.contact) return 'Contact';
    if (item.email) return 'Email';
    if (item.article) return 'Article';
    return 'Unknown';
}