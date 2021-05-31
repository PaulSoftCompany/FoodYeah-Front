import { Customer } from './customer';
import { OrderDetail } from './orderDetail';
import { MatTableDataSource } from '@angular/material/table';

export class Order {
    id:number;
    orderDetails?: OrderDetail[] | MatTableDataSource<OrderDetail>;
    costumer:Customer;
    inittime:string;
    endtime:string;
    totalPrice:number;
    state:string;
}