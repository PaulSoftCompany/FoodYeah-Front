import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.HOST_URL}/oauth/token`;

  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string) {
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/encodeURIComponent
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post(this.url, body, {
      //btoa:https://developer.mozilla.org/es/docs/Web/API/WindowBase64/Base64_codificando_y_decodificando
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });

  }
  isLogged() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  getUser(){
            const helper = new JwtHelperService();  
     let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
        const decodedToken = helper.decodeToken(tk.access_token);
        let user = decodedToken.authorities[0];
        return user;
  }

  signOut() {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    this.http.get(`${environment.HOST_URL}/tokens/cancel/${access_token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }
}
