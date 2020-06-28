import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/_service/card.service';
import { Card } from 'src/_model/card';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderService } from 'src/_service/order.service';
import { Order } from 'src/_model/order';

@Component({
  selector: 'app-orderbuydialog',
  templateUrl: './orderbuydialog.component.html',
  styleUrls: ['./orderbuydialog.component.css']
})
export class OrderbuydialogComponent implements OnInit {

  card: Card;
  cards: Array<Card>;
  form: FormGroup;

  constructor(private cardService: CardService, private orderService: OrderService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private dialogRef: MatDialogRef<OrderbuydialogComponent>) {

  }

  ngOnInit() {
    this.card = new Card();

    this.cardService.getAllCards().subscribe(
      data => { this.cards = data });

    this.form = this.fb.group({
      cardNumber: new FormControl(''),
      cardCvi: new FormControl(''),
      cardExpireDate: new FormControl(''),
    });
  }

  deliverOrder() {
    this.card.cardNumber = this.form.value['cardNumber'];
    console.log(this.card.cardNumber);
    this.card.cardCvi = this.form.value['cardCvi'];
    console.log(this.card.cardCvi);
    this.card.cardExpireDate = this.form.value['cardExpireDate'];
    console.log(this.card.cardExpireDate);

    let aux = 0;
    this.cards.forEach(element => {

      

      if (element.cardNumber == this.card.cardNumber &&
        element.cardCvi == this.card.cardCvi &&
        element.cardExpireDate == this.card.cardExpireDate
      ) {
        this.orderService.deliverOrder(this.data.id, element.id).subscribe(data => {
          this.orderService.message.next("Se Compro el Producto");
        });
        return;
      }

      console.log(element.cardNumber);
      console.log(element.cardCvi);
      console.log(element.cardExpireDate);
      aux++;
    }
    )
    if (aux == this.cards.length)
      this.orderService.message.next("Credenciales Incorrectos");
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}