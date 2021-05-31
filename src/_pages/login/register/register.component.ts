import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
=======

>>>>>>> test
import { PasswordValidation } from './match';
import { MatSnackBar } from '@angular/material/snack-bar';
<<<<<<< HEAD
import { customerCategory } from 'src/_model/customerCategory';
import { CustomerService } from 'src/_service/customer.service';
=======

import { RegisterService } from 'src/_service/register.service';

import { Customer } from 'src/_model/customer';
import { CustomerCategory } from 'src/_model/customerCategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/_service/notification.service';
import { Messages } from 'src/app/Messages';
import { TypesMessages } from 'src/app/TypesOfMessages';
>>>>>>> test

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})

//Componenete Registro

export class RegisterComponent implements OnInit {

  maxDate:Date;
  usuario:string;
  password:string;
  nombre:string;
  edad:number;
  confirmPassword:string;
  customer:Customer;
  registerForm:FormGroup;

<<<<<<< HEAD
  constructor(private customerService: CustomerService,private fb: FormBuilder, private router: Router, private matSnackBar: MatSnackBar) { }
=======
  constructor(private registerService: RegisterService
    ,private fb: FormBuilder, private router: Router
    ,  private notificationService: NotificationService) { }
>>>>>>> test

  ngOnInit(): void {

    this.initialize()
 
 
  }
 
  initialize(){
    this.registerForm = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required,]),
      nombre: new FormControl('',[Validators.required]),
      edad: new FormControl('',[Validators.required]),
    })
  }
  registerUser(){
    let customerNew= new Customer();

    if(this.registerForm.valid){
    
      if(this.registerForm.get('password').value == this.registerForm.get('confirmPassword').value){
      customerNew.password = this.registerForm.get('password').value;
      }
      else{
        this.notificationService.OpenSnackbar(Messages.errorPasswordValidation,TypesMessages.Error)
      }

      customerNew.customerAge = this.registerForm.get('edad').value;
      customerNew.customerName= this.registerForm.get('nombre').value;
      customerNew.username = this.registerForm.get('usuario').value;
      let customerCategory = new CustomerCategory();
      customerCategory.id =  customerNew.username [0] === 'u' ? 1 : 2;
      customerNew.customerCategory = customerCategory;
      

<<<<<<< HEAD
      this.customerService.register(customer).subscribe(()=>{
        this.matSnackBar.open('Se creó exitosamente','INFO',{
          duration:2000
        });
=======
      this.registerService.register(customerNew).subscribe(()=>{
        this.notificationService.OpenSnackbar(Messages.successRegister,TypesMessages.Success)

>>>>>>> test
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);

      },
      (error)=>{
        this.notificationService.OpenSnackbar(Messages.errorFormRegister,TypesMessages.Error)

      }
      ); 

    }
    else{
      this.notificationService.OpenSnackbar(Messages.errorFormRegister,TypesMessages.Error)

    }
  } 
}
