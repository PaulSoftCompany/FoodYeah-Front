import { customerCategory } from './customerCategory';

export class Customer {
    userId:number;
    username:string;
    password:string;
    customerName:string;
    customerAge:number;
    customerCategory: customerCategory;
}
