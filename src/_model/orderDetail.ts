import { Product } from './product';

export class OrderDetail {
    id:number;
    product:Product;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
}
