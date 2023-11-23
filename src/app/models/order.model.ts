// order.model.ts

export interface Order {
    id: number;
    customerName: string;
    product: string;
    quantity: number;
    totalPrice: number;
    status: string;
}
