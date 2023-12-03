import { Account } from './account.model';
import { OrderItems } from './order-items.model';

export interface Order {
    id: number;
    customer: Account;
    items: OrderItems[];
    totalPrice: number;
    status: string;
    paymentMethod: string;
    paymentReferenceNumber: string;
    paymentDateTime: Date;
    claimedDateTime: Date;
    createdDateTime: Date;
}
