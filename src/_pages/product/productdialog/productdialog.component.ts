import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';
import { ProductCategory } from 'src/_model/productCategory';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCategory } from 'src/_model/customerCategory';


@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {

  form:FormGroup;
  product: Product;
  ingredients:Array<string>;

  constructor(
    private productService: ProductService, private fb:FormBuilder,
    private router:Router, private dialogRef: MatDialogRef<ProductdialogComponent>) { 

      this.ingredients = new Array<string>();


    }

  ngOnInit()  {
    this.form=this.fb.group({
      productName: new FormControl(''),
      productPrice:  new FormControl(''),
      stock:  new FormControl(''),
      sellDay:  new FormControl(''),
      category:new FormControl('')
    });


  }
      register() {
        let productCategory = new ProductCategory();
        productCategory.id =  this.form.value['category'];

        


        this.product = new Product();
        this.product.productName = this.form.value['productName'];
        this.product.stock = this.form.value['stock'];
        this.product.productPrice= this.form.value['productPrice'];
        this.product.sellday = this.form.value['sellDay'];
        this.product.category =productCategory;
        this.product.imageUrl = "test";
        this.product.ingredients = this.ingredients;



        console.log( productCategory.id );
        this.productService.registerProduct(this.product).subscribe(
          ()=>{
            this.dialogRef.close();
            console.log("Creado");
          }
        );
  }
  AddIngredients(newIngredient:string){
    this.ingredients.push(newIngredient);
  }

}
