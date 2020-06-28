import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';
import { ProductCategory } from 'src/_model/productCategory';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCategory } from 'src/_model/customerCategory';
import { VirtualTimeScheduler } from 'rxjs';
import { promise } from 'protractor';
import { ProductCategoryService } from 'src/_service/productcategory.service';


@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {

  opciones: Array<ProductCategory>;
  form: FormGroup;
  product: Product;
  ingredients: Array<string>;
  created: Boolean;
  constructor(private productService: ProductService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Product,
    private router: Router, private dialogRef: MatDialogRef<ProductdialogComponent>, private productcategoryService: ProductCategoryService) {
    this.ingredients = new Array<string>();
  }

  ngOnInit() {
    this.product = new Product();
    this.product.productName = this.data.productName;
    this.product.stock = this.data.stock;
    this.product.productPrice = this.data.productPrice;
    this.product.sellday = this.data.sellday;
    this.product.category = this.data.category;
    this.product.imageUrl = this.data.imageUrl;
    this.product.id = this.data.id;
    this.product.ingredients = this.ingredients;
    this.product.category = this.data.category;


    this.productcategoryService.getAllProductsCategories().subscribe(
      data => { this.opciones = data });



    this.created = new Boolean();
    this.created = false;
    if (this.product != null && this.product.id > 0) {
      this.created = true;
    }

    if (this.created == true) {
      this.ingredients = this.data.ingredients;
      this.form = this.fb.group({
        productName: new FormControl(this.data.productName),
        productPrice: new FormControl(this.data.productPrice),
        stock: new FormControl(this.data.stock),
        sellDay: new FormControl(this.data.sellday),
        imageUrl: new FormControl(this.data.imageUrl),
        category: new FormControl(this.data.category.id)
      });

    }
    else {
      this.ingredients = new Array<string>();

      this.form = this.fb.group({
        productName: new FormControl(''),
        productPrice: new FormControl(''),
        stock: new FormControl(''),
        sellDay: new FormControl(''),
        category: new FormControl(''),
        imageUrl: new FormControl('')
      });
    }
  }
  registerOrUpdate() {
    let productCategory = new ProductCategory();
    productCategory = this.form.value['category'];
    this.product.productName = this.form.value['productName'];
    this.product.stock = this.form.value['stock'];
    this.product.productPrice = this.form.value['productPrice'];
    this.product.sellday = this.form.value['sellDay'];
    this.product.category = productCategory;
    this.product.imageUrl = this.form.value['imageUrl'];
    this.product.ingredients = this.ingredients;

    if (this.created == false) {
      this.product.id = null;
      this.productService.registerProduct(this.product).subscribe(data => {
        this.productService.getAllProducts().subscribe(savings => {
          this.productService.productsChange.next(savings);
          this.productService.message.next("Se registro");
        });
      });
    }
    else {
      this.productService.updateProduct(this.product.id, this.product).subscribe(data => {
        this.productService.getAllProducts().subscribe(savings => {
          this.productService.productsChange.next(savings);
          this.productService.message.next("Se actualizo");
        });
      });
    }
    this.dialogRef.close();
  }
  AddIngredients(newIngredient: string) {
    this.ingredients.push(newIngredient);
  }
  DeleteLastIngredient() {
    this.ingredients.pop();
  }
  close() {
    this.dialogRef.close();
  }
}