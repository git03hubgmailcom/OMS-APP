import { Account } from './account.model';
import { Order } from './order.model';

export interface Collection {
    id: number;
    collector: Account;
    orders: Order[];
    totalPrice: number;
    status: string;
    paymentDateTime: Date;
    claimedDateTime: Date;
    createdDateTime: Date;
}
