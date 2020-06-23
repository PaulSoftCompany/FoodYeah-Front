import { ProductCategory } from './productCategory';

export class Product {
   id:number;
   productName:string;
   productPrice:number;
   sellday:number;
   stock:number;
   imageUrl:string;
   ingredients:Array<string>;
   category:ProductCategory;
   state:string;
}
