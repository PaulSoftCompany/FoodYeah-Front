import { Component, OnInit } from '@angular/core';
import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: Array<Product>;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {this.products = data;
    });
  }

}
