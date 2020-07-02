import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/_service/card.service';
import { Card } from 'src/_model/card';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderService } from 'src/_service/order.service';
import { Order } from 'src/_model/order';
import { LoginService } from 'src/_service/login.service';
import { CustomerService } from 'src/_service/customer.service';
import { Customer } from 'src/_model/customer';

@Component({
  selector: 'app-orderbuydialog',
  templateUrl: './orderbuydialog.component.html',
  styleUrls: ['./orderbuydialog.component.css']
})
export class OrderbuydialogComponent implements OnInit {
  User: string;
  cards: Array<Card>;
  form: FormGroup;
  tarjetas: Array<Card>
  tarjetaElejida: Card;
  Username;
  customer: Customer;
  constructor(private cardService: CardService, private orderService: OrderService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private dialogRef: MatDialogRef<OrderbuydialogComponent>, private loginService: LoginService, private customerService: CustomerService) {

  }

  ngOnInit() {
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


    this.User = this.loginService.getUser();
    if (this.User == 'USER') {
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

      if (this.data.totalPrice > this.tarjetaElejida.cardMoney) {
        console.log("No hay dinero suficiente")
        this.orderService.message.next("No hay dinero suficiente");
      }
      else
        this.cardService.getAllCards().subscribe(data => {
          this.orderService.deliverOrder(this.data.id, data.length).subscribe(savings => {
            this.orderService.message.next("Se Compro el Producto");
            //this.orderService.ordersChange.next(savings[]);
            this.dialogRef.close();
          })
        })
    }
    else {
      console.log(this.data.totalPrice)
      console.log(this.tarjetaElejida.cardMoney)
      if (this.data.totalPrice > this.tarjetaElejida.cardMoney)
        this.orderService.message.next("No hay dinero suficiente");
      else {
        this.orderService.deliverOrder(this.data.id, this.tarjetaElejida.id).subscribe(savings => {
          this.orderService.message.next("Se Compro el Producto");
          //this.orderService.ordersChange.next(savings[]);
          this.dialogRef.close();
        }
        )
      }
    }
  }


  close() {
    console.log("OE CTMR")
    this.dialogRef.close();
  }
}
