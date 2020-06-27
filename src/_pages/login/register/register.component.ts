import { Component, OnInit } from '@angular/core';

import {MaterialModule} from 'src/_material/material/material.module'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from './match';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RegisterService } from 'src/_service/register.service';

import { Customer } from 'src/_model/customer';
import { CustomerCategory } from 'src/_model/customerCategory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})

//Componenete Registro

export class RegisterComponent implements OnInit {

  form:FormGroup;
  maxDate:Date;
  usuario:string;
  password:string;
  nombre:string;
  edad:number;
  confirmPassword:string;
  customer:Customer;

  constructor(private registerService: RegisterService
    ,private fb: FormBuilder, private router: Router
    ,  private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {

 
 
  }
  
  registerUser(){
    let customerNew= new Customer();

    if(this.confirmPassword === this.password)
    customerNew.password = this.password;

      customerNew.customerAge = this.edad;
      customerNew.customerName= this.nombre;
      customerNew.username = this.usuario;
      let customerCategory = new CustomerCategory();
      customerCategory.id =  customerNew.username [0] === 'u' ? 1 : 2;
      customerNew.customerCategory = customerCategory;
      

      this.registerService.register(customerNew).subscribe(()=>{
        this.matSnackBar.open('Se creó exitosamente','INFO',{
          duration:2000
        });

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);

      }); 

      /*
      this.registerService.assignRole(this.customer).subscribe(()=>{
        this.matSnackBar.open('Se creó exitosamente','INFO',{
          duration:2000
        });
        
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      });
      */
  } 
}
