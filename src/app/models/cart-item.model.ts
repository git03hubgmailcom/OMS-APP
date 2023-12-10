import { Menu } from './menu.model';

export interface CartItem {
    id: number;
    /* customer: Account; */
    total_price: number;
    status: string;
    menu: Menu;
    quantity: number;
}
