import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/_service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FoodYeahSourceFront';
  User:string;
  constructor(public loginService: LoginService){
  }

  ngOnInit(): void {
    this.User= this.loginService.getUser();
    console.log(this.User)
  }
}
