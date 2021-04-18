import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LoginService } from 'src/_service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/_service/notification.service';
import { Messages } from 'src/app/Messages';
import { TypesMessages } from 'src/app/TypesOfMessages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  message: string = "";
  error: string = "";
  loginForm:FormGroup;

  constructor(private loginService: LoginService, private router: Router,private notificationService:NotificationService) { }

  ngOnInit() {
    this.initialize()
  }

  initialize(){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  logIn() {
    let credentials = {
      username : this.loginForm.get('username').value,
      password : this.loginForm.get('password').value
    }
    
    if(this.loginForm.valid){
      this.loginService.login(credentials.username, credentials.password).subscribe(data => {
        if (data) {
          const helper = new JwtHelperService();
          let token = JSON.stringify(data);
          sessionStorage.setItem(environment.TOKEN_NAME, token);
          let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
          const decodedToken = helper.decodeToken(tk.access_token);
          this.router.navigate(['home']);
          this.notificationService.OpenSnackbar(Messages.successLogIn,TypesMessages.Success)
        }
       
      },(error)=>{
        this.notificationService.OpenSnackbar(Messages.errorLogIn,TypesMessages.Error)

      });
    }
    else{
      this.notificationService.OpenSnackbar(Messages.errorFormLogIn,TypesMessages.Error)

    }

    
  }
}