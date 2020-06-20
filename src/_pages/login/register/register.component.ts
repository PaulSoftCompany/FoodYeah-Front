import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from './match';
import { Customer } from 'src/_model/customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { customerCategory } from 'src/_model/customerCategory';
import { CustomerService } from 'src/_service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})

//Componenete Registro

export class RegisterComponent implements OnInit {

  form:FormGroup;
  maxDate:Date;

  constructor(private customerService: CustomerService,private fb: FormBuilder, private router: Router, private matSnackBar: MatSnackBar) { }

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
      let categoria = new customerCategory();
      let customer = new Customer();
      customer.customerAge=this.form.value['age'];
      customer.customerName = this.form.value['firstName'];
      customer.username = this.form.value['username'];
      customer.password = this.form.value['password'];
      categoria.id = customer.username[0] === 'u' ? 1 : 2;
      customer.customerCategory =categoria ;
      

      this.customerService.register(customer).subscribe(()=>{
        this.matSnackBar.open('Se creó exitosamente','INFO',{
          duration:2000
        });
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      });
  } 
}
