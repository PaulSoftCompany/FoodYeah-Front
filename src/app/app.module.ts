import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/_material/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from 'src/_pages/login/register/register.component';
import { LoginComponent } from 'src/_pages/login/login.component';
import { MatCardModule  } from '@angular/material/card';
import { HomeComponent } from 'src/_pages/home/home.component';
import { ProductComponent } from 'src/_pages/product/product.component';
import { ProductdialogComponent } from 'src/_pages/product/productdialog/productdialog.component';
import { MatTableModule } from '@angular/material/table';
import { OrderdialogComponent } from 'src/_pages/order/orderdialog/orderdialog.component';
import { OrderComponent } from 'src/_pages/order/order.component';
import { ProductlistComponent } from 'src/_pages/product/productlist/productlist.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductcategoryComponent } from 'src/_pages/productcategory/productcategory.component';
import { CategorydialogComponent } from 'src/_pages/productcategory/categorydialog/categorydialog.component';

import { CarddialogComponent } from 'src/_pages/cards/carddialog/carddialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OrderbuydialogComponent } from 'src/_pages/order/orderbuydialog/orderbuydialog.component';
import { CardComponent } from 'src/_pages/cards/card.component';
import { OrderuserComponent } from 'src/_pages/order/orderuser/orderuser.component';
import { OrderuserbuyComponent } from 'src/_pages/order/orderuserbuy/orderuserbuy.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductdialogComponent,
    OrderComponent,
    OrderdialogComponent,
    ProductlistComponent,
    ProductcategoryComponent,
    CategorydialogComponent,
    CardComponent,
    CarddialogComponent,
    OrderbuydialogComponent,
    OrderuserComponent,
    OrderuserbuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
