import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Order } from 'src/_model/order';
import { OrderService } from 'src/_service/order.service';

import { Product } from 'src/_model/product';
import { OrderDetail } from 'src/_model/orderDetail';
import { Customer } from 'src/_model/customer';



@Component({
  selector: 'app-orderdialog',
  templateUrl: './orderdialog.component.html',
  styleUrls: ['./orderdialog.component.css']
})

export class OrderdialogComponent implements OnInit {
  customer: Customer;
  order: Order;
  orderDetails: Array<OrderDetail>;

  constructor(private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public data: Customer
    , private dialogRef: MatDialogRef<OrderdialogComponent>) { }

  ngOnInit() {
    this.orderDetails = new Array<OrderDetail>();
    this.order = new Order();
    this.customer = new Customer();

    this.customer.id = this.data.id;
    this.order.costumer = this.customer;
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

  AddOrderDetail(productId: number, quantity: number) {
    let _product = new Product();
    _product.id = productId;

    let _orderDetail = new OrderDetail();
    _orderDetail.product = _product;
    _orderDetail.quantity = quantity;

    this.orderDetails.push(_orderDetail);
  }

  DeleteLastOrderDetial() {
    this.orderDetails.pop();
  }
}
