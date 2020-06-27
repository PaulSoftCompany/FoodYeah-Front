import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Card } from 'src/_model/card';
import { CardService } from 'src/_service/card.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCategory } from 'src/_model/customerCategory';
import { VirtualTimeScheduler } from 'rxjs';
import { promise } from 'protractor';
import { Customer } from 'src/_model/customer';
import { CustomerService } from 'src/_service/customer.service';


@Component({
  selector: 'app-carddialog',
  templateUrl: './carddialog.component.html',
  styleUrls: ['./carddialog.component.css']
})
export class CarddialogComponent implements OnInit {

  customers: Array<Customer>
  form: FormGroup;
  card: Card;
  constructor(private cardService: CardService, private customerService: CustomerService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private router: Router, private dialogRef: MatDialogRef<CarddialogComponent>) {

  }

  ngOnInit() {
    this.card = new Card();
    this.card.id = this.data.id;
    this.card.cardNumber = this.data.cardNumber;
    this.card.cardType = this.data.cardType;
    this.card.cardCvi = this.data.cardCvi;
    this.card.cardExpireDate = this.data.cardExpireDate;
    this.card.cardMoney = this.data.cardMoney;
    this.card.state = this.data.state;
    this.card.customer = this.data.customer;

    this.customerService.getAllCustomers().subscribe(
      data => { this.customers = data });

    this.form = this.fb.group({
      cardNumber: new FormControl(''),
      cardType: new FormControl(''),
      cardCvi: new FormControl(''),
      cardExpireDate: new FormControl(''),
      cardMoney: new FormControl(''),
      customer: new FormControl('')
    });
  }
  register() {
    let cardCustomer = new Customer();
    cardCustomer = this.form.value['customer'];
    console.log(cardCustomer);
    this.card.cardNumber = this.form.value['cardNumber'];
    this.card.cardType = this.form.value['cardType'];
    this.card.cardCvi = this.form.value['cardCvi'];
    this.card.cardExpireDate = this.form.value['cardExpireDate'];
    this.card.cardMoney = this.form.value['cardMoney'];
    this.card.customer = cardCustomer;

    this.card.id = null;
    this.cardService.registerCard(this.card).subscribe(data => {
      this.cardService.getAllCards().subscribe(savings => {
        this.cardService.cardsChange.next(savings);
        this.cardService.message.next("Se registro");
      });
    });
    this.dialogRef.close();
  }

  displayFn(customer: Customer): string {
    return customer && customer.username ? customer.username : '';
  }

  close() {
    this.dialogRef.close();
  }
}