import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';
import { ProductCategory } from 'src/_model/productCategory';


@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {


  product: Product;

  constructor(private dialogRef: MatDialogRef<ProductdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _product: Product, @Inject(MAT_DIALOG_DATA) public _productCategory: ProductCategory,
    private productService: ProductService) { }

  ngOnInit() {
    let productCategory = new ProductCategory();
    productCategory.id = this._productCategory.id;

    this.product = new Product();
    this.product.id = this._product.id;
    this.product.productName = this._product.productName;
    this.product.productPrice = this._product.productPrice;
    this.product.stock = this._product.stock;
    this.product.sellday = this._product.sellday;
    this.product.productCategory = productCategory;
  }

  cancel() {
    this.dialogRef.close();
  }

  registerOrUpdate() {

    if (this.product != null && this.product.id > 0) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(data => {
        this.productService.getAllProducts().subscribe(products => {
          this.productService.productsChange.next(products);
          this.productService.message.next("Se modifico");
        });
      });
    } else {
      this.productService.registerProduct(this.product).subscribe(data => {
        this.productService.getAllProducts().subscribe(products => {
          this.productService.productsChange.next(products);
          this.productService.message.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

}
