import { Account } from './account.model';
import { Order } from './order.model';

export interface CollectionItem {
    id: number;
    order: Order;
    status: string;
    date_created: Date;
    date_updated: Date;
    collection_id: number;
}
