import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/_model/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductdialogComponent } from './productdialog/productdialog.component';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['nombre','precio','stock', 'acciones','state'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private productService:ProductService, private dialog:MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    

    this.productService.message.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });
  
    this.productService.getAllProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}



openDialog(product?: Product) {
  let productdialog = product != null ? product : new Product();
  this.dialog.open(ProductdialogComponent, {
    width: '250px',
    disableClose: true,
    data: productdialog
  })
}

delete(product: Product) {
  this.productService.deleteProduct(product.id).subscribe(data => {
    this.productService.getAllProducts().subscribe(products => {
      this.productService.productsChange.next(products);
      this.productService.message.next("Se elimino");
    });
  });
}
}
