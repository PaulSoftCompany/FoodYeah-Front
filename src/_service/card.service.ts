import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Card } from 'src/_model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cardsChange = new Subject<Card[]>();
  message = new Subject<string>();

  url:string = `${environment.HOST_URL}/cards`;

  constructor(private http: HttpClient) { }

  getAllCards(){
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.get<Card[]>(this.url, {
      headers: new HttpHeaders().set('Authorization',
        `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registerCard(card: Card) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post(this.url, card, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  updateCard(cardId: number, card: Card) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/${cardId}`, card, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  deleteCard(cardId: number) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/${cardId}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
