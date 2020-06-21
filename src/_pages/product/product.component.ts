import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/_model/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['nombre','precio','stock', 'acciones'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;



  constructor(private productService:ProductService, private dialog:MatDialog,
    private snackBar:MatSnackBar
    
    ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }

}
