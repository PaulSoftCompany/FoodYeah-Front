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
  customer:Customer;

  constructor(private registerService: RegisterService,private fb: FormBuilder, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.maxDate = new Date();

    this.form = this.fb.group({
      firstName: new FormControl(''),
      age: new FormControl(''),
      username: new FormControl(''),
      password: [''],
      confirmPassword: [''],
    
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }
  registerUser(){
      let customerUsername = this.form.value['username'];

      let customerCategory = new CustomerCategory();
      customerCategory.id = customerUsername[0] === 'u' ? 1 : 2;

      this.customer = new Customer();
      this.customer.customerAge=this.form.value['age'];
      this.customer.customerName = this.form.value['firstName'];
      this.customer.username = customerUsername;
      this.customer.password = this.form.value['password'];
      this.customer.customerCategory = customerCategory

      this.registerService.register(this.customer).subscribe(()=>{
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
