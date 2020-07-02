import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Order } from 'src/_model/order';
import { OrderService } from 'src/_service/order.service';

import { Product } from 'src/_model/product';
import { OrderDetail } from 'src/_model/orderDetail';
import { Customer } from 'src/_model/customer';
import { ProductService } from 'src/_service/product.service';
import { CustomerService } from 'src/_service/customer.service';
import { LoginService } from 'src/_service/login.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.css']
})

export class OrderuserComponent implements OnInit {
  User: string;
  Username: string;
  customer: Customer;
  order: Order;
  customers: Array<Customer>;
  orderDetails: Array<OrderDetail>;
  products: Array<Product>;
  product
  productseleccionado: Product;
  //para la obtencion de la id
  id: number;
  private sub: any;
  constructor(private orderService: OrderService, private productService: ProductService,
    private customerService: CustomerService, private loginservice: LoginService, private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    //obtencion de la id
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

    this.Username = this.loginservice.getUserName();
    
    this.product = new Product();
    
    if (this.id != null){
      this.productService.getProductById(this.id).subscribe(data => {
        this.product = data;
      })
    }

    this.orderDetails = new Array<OrderDetail>();
    this.order = new Order();

    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    })
    this.customerService.getCustomerByUserName(this.Username).subscribe(data => {
      this.customer = data;
    })
  }

  register() {
    this.order.orderDetails = this.orderDetails;

    this.orderService.registerOrder(this.order).subscribe(data => {
      this.orderService.getAllOrders().
        map((users: Array<Order>) => users.filter(user => user.costumer.username === this.Username)).subscribe(orders => {
          this.orderService.ordersChange.next(orders);
          this.orderService.message.next("Se registro");
        });

        var length
        this.orderService.getAllOrders().subscribe(data => {
          console.log(data.length)
          length = data.length
          this.router.navigate(['/orderuserbuy', length]);
        })
    });
  }

  close() {
    this.router.navigate(['productslist']);
  }

  AddOrderDetail(quantity: number) {
    if(quantity >0){
    console.log(this.product.id);

    this.order.costumer = this.customer;
    let _orderDetail = new OrderDetail();
    _orderDetail.product = this.product;
    _orderDetail.quantity = quantity;


    this.orderDetails.push(_orderDetail);
    }
  }

  DeleteLastOrderDetial() {
    this.orderDetails.pop();
  }
}
