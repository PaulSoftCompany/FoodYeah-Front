import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/_model/product';
import { ProductService } from 'src/_service/product.service';
import { Order } from 'src/_model/order';
import { OrderdialogComponent } from 'src/_pages/order/orderdialog/orderdialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any;
  menudeldia:any;
  constructor(private productService:ProductService,private dialog: MatDialog) { }

  ngOnInit(): void {
    var d = new Date();
    var n = d.getDay();

    this.productService.getPlatoCarta().subscribe(data => {this.products = data;
    });
    this.productService.getMenuDelDia(n).subscribe(data => {this.menudeldia = data;
    });
    
   

  }
  
   

  openDialog(product? : Product) {
    this.dialog.open(OrderdialogComponent, {
      width: '250px',
      disableClose: false,
      data: product
    })
  }
  
}
