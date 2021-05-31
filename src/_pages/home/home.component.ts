import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/_service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  User:string;

  constructor(private loginService:LoginService) { } 

  ngOnInit(): void {
    this.User= this.loginService.getUser();

  }

}
