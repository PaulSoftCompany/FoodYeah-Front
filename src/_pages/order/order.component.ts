import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { OrderService } from 'src/_service/order.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Order } from 'src/_model/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderdialogComponent } from './orderdialog/orderdialog.component';


import { trigger, state, style, animate, transition } from '@angular/animations';
import { OrderDetail } from 'src/_model/orderDetail';
import { Customer } from 'src/_model/customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderbuydialogComponent } from './orderbuydialog/orderbuydialog.component';
import { LoginService } from 'src/_service/login.service';
import { userInfo } from 'os';
import 'rxjs/Rx';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrderComponent {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<OrderDetail>>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  User:string;
  Username:string;
  dataSource: MatTableDataSource<Order>;
  ordersData: Order[] = [];
  columnsToDisplay = [ 'customer', 'inittime', 'totalPrice', 'state', 'actions'];
  innerDisplayedColumns = ['id', 'totalPrice'];
  expandedElement: Order | null;
  test:Array<Order>;
  postsfilter:any;
  constructor(
    private cd: ChangeDetectorRef, private orderService:OrderService, private snackBar: MatSnackBar,
     private dialog: MatDialog,private loginService:LoginService
  ) { }

  ngOnInit() {

    this.User= this.loginService.getUser();
    this.Username = this.loginService.getUserName();
    this.orderService.ordersChange.subscribe(data => {
      this.dataSource = new MatTableDataSource<Order>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.orderService.message.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });
    //Obtiene las ordenes del usuario
    this.orderService.getAllOrders().
    map((users: Array<Order>) => users.filter(user => user.costumer.username === this.Username ))
    .subscribe(data => {
      this.dataSource = new MatTableDataSource<Order>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

   
  }

  toggleRow(element: Order) {

    element.orderDetails && (element.orderDetails as MatTableDataSource<OrderDetail>)
    .data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => 
    (table.dataSource as MatTableDataSource<OrderDetail>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<OrderDetail>)
    .filter = filterValue.trim().toLowerCase());
  }

  openDialog() {
    let orderdialog = new Order();
    this.dialog.open(OrderdialogComponent, {
      width: '250px',
      disableClose: false,
      data: orderdialog
    })
  }

  openBuyDialog(orderbuydialog : Order) {
    this.dialog.open(OrderbuydialogComponent, {
      width: '250px',
      disableClose: false,
      data: orderbuydialog
    })
  }



}






