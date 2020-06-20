import { CustomerCategory } from './customerCategory';

export class Customer {
    id:number;
    username:string;
    password:string;
    customerName:string;
    customerAge:number;
    customerCategory: CustomerCategory;
}
