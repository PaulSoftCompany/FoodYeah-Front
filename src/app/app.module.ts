import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule  } from '@angular/material/card';

import { MaterialModule } from 'src/_material/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from 'src/_pages/login/register/register.component';
import { LoginComponent } from 'src/_pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    MatCardModule 
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
