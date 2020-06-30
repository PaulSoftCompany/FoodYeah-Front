import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from 'src/_model/customer';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customersChange = new Subject<Customer[]>();
  message = new Subject<string>();

  url:string = `${environment.HOST_URL}/customers`;

  constructor(private http: HttpClient) { }

  getAllCustomers(){
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.get<Customer[]>(this.url, {
      headers: new HttpHeaders().set('Authorization',
        `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

    getCustomerByUserName(username){
      let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
      return this.http.get<Customer>(`${this.url}/user=${username}`, {
        headers: new HttpHeaders().set('Authorization',
          `bearer ${access_token}`).set('Content-Type', 'application/json')
      });
    
    }

}