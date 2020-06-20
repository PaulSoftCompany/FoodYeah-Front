import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/_model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

url:string = `${environment.HOST_URL}/products`;

  constructor(private http: HttpClient) { }

  getAllProducts(){
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.get<Product[]>(this.url, {
      headers: new HttpHeaders().set('Authorization',
        `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
