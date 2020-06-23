import { Customer } from './customer';
import { OrderDetails } from './orderDetails';

export class Order {
    id:number;
    orderDetails:OrderDetails;
    customer:Customer;
}
