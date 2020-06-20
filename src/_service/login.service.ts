import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
url:string= `${environment.HOST_URL}/oauth/token`;

  constructor(private http:HttpClient,private router:Router) { }

  login(username: string, password: string) {
    //Nombre y contraseña
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/encodeURIComponent
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;


    //La autorizacion para hacer el token
    return this.http.post(this.url, body, {
      //btoa:https://developer.mozilla.org/es/docs/Web/API/WindowBase64/Base64_codificando_y_decodificando
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });

  }
}
