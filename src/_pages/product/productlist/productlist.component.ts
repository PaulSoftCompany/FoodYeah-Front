import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any;
  menudeldia:any;
  constructor(private productService:ProductService
  ) { }

  ngOnInit(): void {
    var d = new Date();
    var n = d.getDay();

    this.productService.getPlatoCarta().subscribe(data => {this.products = data;
    });
    this.productService.getMenuDelDia(n).subscribe(data => {this.menudeldia = data;
    });
    
   

  }

  

}
