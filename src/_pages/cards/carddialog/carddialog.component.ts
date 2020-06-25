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


@Component({
  selector: 'app-carddialog',
  templateUrl: './carddialog.component.html',
  styleUrls: ['./carddialog.component.css']
})
export class CarddialogComponent implements OnInit {

  opciones: Array<CardCategory>;
  form: FormGroup;
  card: Card;
  ingredients: Array<string>;
  created: Boolean;
  constructor(private cardService: CardService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Card,
    private router: Router, private dialogRef: MatDialogRef<CarddialogComponent>, private cardcategoryService: CardCategoryService) {
    this.ingredients = new Array<string>();
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

    let _customer = new Customer();
    _customer.id = this.data.customer.id;
    this.card.customer = _customer;

    this.created = new Boolean();
    this.created = false;
    if (this.card != null && this.card.id > 0) {
      this.created = true;
    }

    if (this.created == true) {
      this.form = this.fb.group({
        cardNumber: new FormControl(this.card.cardNumber),
        cardType: new FormControl(this.data.cardType),
        cardCvi: new FormControl(this.data.cardCvi),
        cardExpireDate: new FormControl(this.data.cardExpireDate),
        cardMoney: new FormControl(this.data.cardMoney),
        customerId: new FormControl(this.data.customer.id)
      });

    }
    else {
      this.ingredients = new Array<string>();

      this.form = this.fb.group({
        cardName: new FormControl(''),
        cardPrice: new FormControl(''),
        stock: new FormControl(''),
        sellDay: new FormControl(''),
        category: new FormControl(''),
        imageUrl: new FormControl('')
      });
    }
  }
  registerOrUpdate() {
    let cardCategory = new CardCategory();
    cardCategory = this.form.value['category'];
    console.log(cardCategory.cardCategoryName);
    this.card.cardName = this.form.value['cardName'];
    this.card.stock = this.form.value['stock'];
    this.card.cardPrice = this.form.value['cardPrice'];
    this.card.sellday = this.form.value['sellDay'];
    this.card.category = cardCategory;
    this.card.imageUrl = this.form.value['imageUrl'];
    this.card.ingredients = this.ingredients;

    if (this.created == false) {
      this.card.id = null;
      this.cardService.registerCard(this.card).subscribe(data => {
        this.cardService.getAllCards().subscribe(savings => {
          this.cardService.cardsChange.next(savings);
          this.cardService.message.next("Se registro");
        });
      });
    }
    else {
      this.cardService.updateCard(this.card.id, this.card).subscribe(data => {
        this.cardService.getAllCards().subscribe(savings => {
          this.cardService.cardsChange.next(savings);
          this.cardService.message.next("Se actualizo");
        });
      });
    }
    this.dialogRef.close();
  }
  AddIngredients(newIngredient: string) {
    this.ingredients.push(newIngredient);
  }
  DeleteLastIngredient() {
    this.ingredients.pop();
  }
  close() {
    this.dialogRef.close();
  }
}