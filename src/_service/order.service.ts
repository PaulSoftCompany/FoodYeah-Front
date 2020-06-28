import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from 'src/_model/order';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersChange = new Subject<Order[]>();
  message = new Subject<string>();

  url:string = `${environment.HOST_URL}/orders`;

  constructor(private http: HttpClient) { }

  getAllOrders(){
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.get<Order[]>(this.url, {
      headers: new HttpHeaders().set('Authorization',
        `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registerOrder(orders: Order) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post(this.url, orders, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  deliverOrder(orderId: number, cardId: number) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/${orderId}/card=${cardId}`,null,{
      headers: new HttpHeaders().set('Authorization',
        `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
