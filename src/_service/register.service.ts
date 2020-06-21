import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Customer} from 'src/_model/customer'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
url:string= `${environment.HOST_URL}/customers`;

  constructor(private http:HttpClient) { }

  register(customer: Customer){
    return this.http.post(this.url,customer);
  }

  assignRole(customer: Customer){
    return this.http.post(`${this.url}/${customer.id}/role=/${customer.customerCategory.id}`, customer);
  }
}
