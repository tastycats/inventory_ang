export interface InventoryItem {
    productName: string;
    manufacturer: string;
    id: string;
    category: string;
    units: number;
    unitPrice: number;
    tags: string[];
    lastUpdated: number;
    location: {
        area: string;
        street: string;
        zone: string;
        shelf: string;
    };
    desc: string;
}
