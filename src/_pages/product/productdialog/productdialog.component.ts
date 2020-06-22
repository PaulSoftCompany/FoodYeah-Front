import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';
import { ProductCategory } from 'src/_model/productCategory';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCategory } from 'src/_model/customerCategory';
import { VirtualTimeScheduler } from 'rxjs';


@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {

  form:FormGroup;
  product: Product;
  ingredients:Array<string>;
  Creado: Boolean;
  constructor(private productService: ProductService, private fb:FormBuilder, @Inject (MAT_DIALOG_DATA) public data: Product, 
  private router:Router, private dialogRef: MatDialogRef<ProductdialogComponent>) { 

      this.ingredients = new Array<string>();


    }

  ngOnInit()  {
    this.product = new Product();
    this.product.productName = this.data.productName;
    this.product.stock =  this.data.stock;
    this.product.productPrice=  this.data.productPrice;
    this.product.sellday =  this.data.sellday;
    this.product.category =this.data.category;
    this.product.imageUrl = "test";
    this.product.id = this.data.id;
    this.product.ingredients = this.ingredients;
    this.product.category = this.data.category;

    
     this.Creado = new Boolean();
     this.Creado = false;
        if(this.product != null && this.product.id > 0){
          this.Creado = true;
        }

      if(this.Creado == true){
        this.ingredients = this.data.ingredients;
      this.form=this.fb.group({
      productName: new FormControl(this.product.productName),
      productPrice:  new FormControl(this.data.productPrice),
      stock:  new FormControl(this.data.stock),
      sellDay:  new FormControl(this.data.sellday),
      category:new FormControl(this.data.category.id)
    });}
    else {
      this.ingredients = new Array<string>();

      this.form=this.fb.group({
        productName: new FormControl(''),
        productPrice:  new FormControl(''),
        stock:  new FormControl(''),
        sellDay:  new FormControl(''),
        category:new FormControl('')
      });
    }

  }
      registerOrUpdate() {
        let productCategory = new ProductCategory();
        productCategory.id =  this.form.value['category'];
        this.product.productName = this.form.value['productName'];
        this.product.stock = this.form.value['stock'];
        this.product.productPrice= this.form.value['productPrice'];
        this.product.sellday = this.form.value['sellDay'];
        this.product.category =productCategory;
        this.product.imageUrl = "test";
        this.product.ingredients = this.ingredients;

        if(this.Creado == false){
          this.product.id = null;
        this.productService.registerProduct(this.product).subscribe(
          ()=>{
            this.dialogRef.close();
            console.log("Creado");
          }
        );}
        else{
          this.productService.updateProduct(this.product.id,this.product).subscribe(
            ()=>{
              this.dialogRef.close();
              console.log("updated");
            }
          )
        }
        
  }
  AddIngredients(newIngredient:string){
    this.ingredients.push(newIngredient);
  }
  DeleteLastIngredient(){
    this.ingredients.pop();
  }

}
