import { Menu } from './menu.model';

export interface OrderItems {
    id: number;
    menu: Menu;
    quantity: number;
    totalPrice: number;
}
