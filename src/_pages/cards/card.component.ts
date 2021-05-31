import { Component, OnInit, ViewChild } from '@angular/core';
import { CardService } from 'src/_service/card.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Card } from 'src/_model/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CarddialogComponent } from './carddialog/carddialog.component';
import { filter, map } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Customer } from 'src/_model/customer';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  
})
export class CardComponent implements OnInit {

  cards: Array<Card>;
  dataSource: MatTableDataSource<Card>;

  displayedColumns: string[] = ['id','cardNumber', 'cardCvi','cardOwnerName', 'cardMoney', 'state', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private cardService:CardService, private dialog:MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.cardService.cardsChange.subscribe(data => {
      this.dataSource = new MatTableDataSource<Card>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.cardService.message.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });
  
    this.cardService.getAllCards().subscribe(data => {
      this.dataSource = new MatTableDataSource<Card>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cards = data;
    });
  }

applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}

openDialog(card?: Card) {
  let carddialog = card != null ? card : new Card();
  this.dialog.open(CarddialogComponent, {
    width: '300px',
    disableClose: false,
    data: carddialog
  })
}

delete(card: Card) {
  this.cardService.deleteCard(card.id).subscribe(data => {
    this.cardService.getAllCards().subscribe(cards => {
      this.cardService.cardsChange.next(cards);
      this.cardService.message.next("Se elimino");
    });
  });
}
}