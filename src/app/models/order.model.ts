import { Account } from './account.model';
import { OrderItems } from './order-items.model';

export interface Order {
    id: number;
    customer: Account;
    items: OrderItems[];
    total_price: number;
    status: string;
    payment_method: string;
    payment_reference_number: string;
    payment_dateTime: Date;
    claimed_dateTime: Date;
    created_dateTime: Date;
}
