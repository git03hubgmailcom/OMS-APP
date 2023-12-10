import { Account } from './account.model';
import { CollectionItem } from './collection-item.model';
import { Order } from './order.model';

export interface Collection {
    id: number;
    collector: Account;
    collection_items: CollectionItem[];
    total_price: number;
    status: string;
    payment_datetime: Date;
    claimed_datetime: Date;
    created_datetime: Date;
}
