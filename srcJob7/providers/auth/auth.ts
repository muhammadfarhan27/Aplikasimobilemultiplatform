import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvProvider } from '../env/env';
import { User } from '../../models/user/user-model';

@Injectable()
export class AuthProvider {

  token : any;
  response : any;

  constructor(public http: HttpClient, private env: EnvProvider) {
  }

  //fungsi yang menangani permintaan login ke end point
  login(user: any) {
    //melakukan request dengan method post
    //dengan fungsi pipe untuk meneruskan data ke pemanggil fungsi ini
    return this.http.post(this.env.API_URL + 'login', user)
    .pipe(
      tap(response => {
        this.response = response;
        //mengkonversi data response ke string
        var user = JSON.stringify(this.response.success);
        //menyimpan data user dan token ke penyimpanan local
        localStorage.setItem('user', user);
        this.token = this.response.success.token;
        return response;
      }),
    );
  }

  //fungsi yang menangani permintaan register user ke end point
  register(data: User) {
    //melakukan request dengan method post
    //dengan fungsi pipe untuk meneruskan data ke pemanggil fungsi ini
    return this.http.post(this.env.API_URL + 'register', data).pipe(
      tap(response => {
        return response;
      }),
    );
  }
    
  //fungsi yang menangani permintaan log out ke end point
  logout() {
    //membuat headers agar token dikenali oleh end point
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    //melakukan request dengan method post
    //dengan fungsi pipe untuk meneruskan data ke pemanggil fungsi ini
    return this.http.get(this.env.API_URL + 'logout', { headers: headers }).pipe(
      tap(message => {
        console.log("logout berhasil");
        //menghapus data token dari local storage
        localStorage.removeItem("user");
        delete this.token;
        return message;
      }),
    );
  }


}
