import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvProvider } from '../env/env';
import { User } from '../../models/user/user-model';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  token: any;
  response: any;

  constructor(
    public http: HttpClient,
    private env: EnvProvider) 
    { }

    login(user: any) {
      return this.http.post(this.env.API_URL + 'login' , user)
      .pipe(
        tap(response => {
          this.response = response;
          var user = JSON.stringify(this.response.success);
          localStorage.setItem('user', user);
          this.token = this.response.success.token;
          return response;
        }),
      );
    }

    register(data: User) {
      return this.http.post(this.env.API_URL + 'register', data).pipe(
        tap(response => {
        return response;
      }),
      );
    }

    logout() {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 
        JSON.parse(localStorage.getItem('user')).token,
        'Accept': 'application/json'
      });
      return this.http.get(this.env.API_URL + 'logout', { headers:
      headers }).pipe(
        tap(message => {
          console.log("logout berhasil");
          localStorage.removeItem("user");
          delete this.token;
          return message;
        }),
      );
    }

}
