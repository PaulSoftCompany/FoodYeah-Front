import { Component } from '@angular/core';
import { LoginService } from 'src/_service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodYeahSourceFront';
  
  constructor(public loginService: LoginService){

  }
}
