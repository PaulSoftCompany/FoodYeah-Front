import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Order } from 'src/_model/order';
import { OrderService } from 'src/_service/order.service';

import { Product } from 'src/_model/product';
import { OrderDetail } from 'src/_model/orderDetail';
import { Customer } from 'src/_model/customer';
import { ProductService } from 'src/_service/product.service';
import { CustomerService } from 'src/_service/customer.service';



@Component({
  selector: 'app-orderdialog',
  templateUrl: './orderdialog.component.html',
  styleUrls: ['./orderdialog.component.css']
})

export class OrderdialogComponent implements OnInit {
  customer: Customer;
  order: Order;
  customers:Array<Customer>;
  orderDetails: Array<OrderDetail>;
  productos: Array<Product>;
  producto:Product;
  constructor(private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public data: Customer
    , private dialogRef: MatDialogRef<OrderdialogComponent>,private productService:ProductService, private customerService:CustomerService) { }

  ngOnInit() {
    this.orderDetails = new Array<OrderDetail>();
    this.order = new Order();

    this.productService.getAllProducts().subscribe(data=>{
      this.productos = data;
    });
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = data;
    })

    
  }

  register() {
    this.order.orderDetails = this.orderDetails;

    this.orderService.registerOrder(this.order).subscribe(data => {
      this.orderService.getAllOrders().subscribe(orders => {
        this.orderService.ordersChange.next(orders);
        this.orderService.message.next("Se registro");
      });
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  AddOrderDetail(quantity: number) {
    

    console.log(this.customer.customerName);
    this.order.costumer = this.customer;
    
    let _orderDetail = new OrderDetail();
    _orderDetail.product = this.producto;
    _orderDetail.quantity = quantity;

    this.orderDetails.push(_orderDetail);
  }

  DeleteLastOrderDetial() {
    this.orderDetails.pop();
  }
}
