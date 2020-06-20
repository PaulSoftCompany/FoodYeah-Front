import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LoginService } from 'src/_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: string = "";
  error: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      if (data) {
        //
        //const helper = new JwtHelperService();

        let token = JSON.stringify(data);
        sessionStorage.setItem(environment.TOKEN_NAME, token);

        //let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
        //https://www.npmjs.com/package/@auth0/angular-jwt
        //const decodedToken = helper.decodeToken(tk.access_token);


        this.router.navigate(['']);

      }
    });
  }
}