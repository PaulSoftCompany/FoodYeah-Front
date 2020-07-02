import { Component, OnInit, Inject } from '@angular/core';
import { CardService } from 'src/_service/card.service';
import { Card } from 'src/_model/card';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderService } from 'src/_service/order.service';
import { Order } from 'src/_model/order';
import { LoginService } from 'src/_service/login.service';
import { CustomerService } from 'src/_service/customer.service';
import { Customer } from 'src/_model/customer';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-orderuserbuy',
  templateUrl: './orderuserbuy.component.html',
  styleUrls: ['./orderuserbuy.component.css']
})
export class OrderuserbuyComponent implements OnInit {
  cards: Array<Card>;
  form: FormGroup;
  tarjetas: Array<Card>;
  tarjetaElejida: Card;
  Username;
  order;
  User;
  customer: Customer;
  //para la obtencion de la id
  id: number;
  private sub: any;
  constructor(private cardService: CardService, private orderService: OrderService, private fb: FormBuilder,
    private loginService: LoginService, private customerService: CustomerService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //obtencion de la id
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

    this.order = new Order();

    if (this.id != null)
      this.orderService.getOrderById(this.id).subscribe(data => {
        this.order = data;
      });

    this.tarjetaElejida = new Card();
    this.customer = new Customer();
    this.cardService.getAllCards().subscribe(
      data => { this.cards = data });

    this.form = this.fb.group({
      cardNumber: new FormControl(''),
      cardCvi: new FormControl(''),
      cardExpireDate: new FormControl(''),
    });
    this.User = this.loginService.getUser();
    this.Username = this.loginService.getUserName();
    this.customerService.getCustomerByUserName(this.Username).subscribe(data =>
      this.customer = data);

    if (this.User != 'ADMIN') {
      this.cardService.getAllCards().
        map((card: Array<Card>) => card.filter(card => card.customer.username === this.Username)).subscribe(data =>
          this.tarjetas = data);
    }
    else {
      this.cardService.getAllCards().subscribe(data =>
        this.tarjetas = data);
    }
  }

  deliverOrder() {
    if (this.tarjetaElejida.cardCvi == null) {
      this.tarjetaElejida.cardCvi = this.form.value['cardCvi'];
      this.tarjetaElejida.cardExpireDate = this.form.value['cardExpireDate'];
      this.tarjetaElejida.cardNumber = this.form.value['cardNumber'];
      this.tarjetaElejida.cardMoney = 200;
      this.tarjetaElejida.cardOwnerName = this.customer.customerName;
      this.tarjetaElejida.cardType = true;
      this.tarjetaElejida.customer = this.customer;
      this.cardService.registerCard(this.tarjetaElejida).subscribe(data =>
        this.orderService.message.next("Tarjeta creada")
      );

      if (this.order.totalPrice > this.tarjetaElejida.cardMoney){
        this.orderService.message.next("No hay dinero suficiente");
        console.log("No hay dinero suficiente2")
      }
      else
        this.cardService.getAllCards().subscribe(data => {

          this.orderService.deliverOrder(this.order.id, data.length).subscribe(data => {
            this.orderService.message.next("Se Compro el Producto");
            this.router.navigate(['orders']);
          })
        })
    }
    else {
      console.log(this.order.totalPrice)
      console.log(this.tarjetaElejida.cardMoney)
      if (this.order.totalPrice > this.tarjetaElejida.cardMoney) {
        this.orderService.message.next("No hay dinero suficiente");
        console.log("No hay dinero suficiente1")
      }
      else {
        this.orderService.deliverOrder(this.order.id, this.tarjetaElejida.id).subscribe(data => {
          console.log("Si hay dinero suficiente")
          this.orderService.message.next("Se Compro el Producto");
          this.router.navigate(['orders']);
          //this.dialogRef.close();
        }
        )
      }
    }
  }


  close() {
    this.router.navigate(['productslist']);
  }
}
