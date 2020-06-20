import { ProductCategory } from './productCategory';

export class Product {
   id:number;
   productName:string;
   productPrice:number;
   sellday:number;
   stock:number;
   imageUrl:number;
   ingredients:[''];
   productCategory:ProductCategory;
}
