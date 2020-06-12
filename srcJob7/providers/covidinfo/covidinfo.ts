import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';

@Injectable()
export class CovidinfoProvider {

  constructor(public http: HttpClient,private env: EnvProvider) {
    console.log('Hello CovidinfoProvider Provider');
  }

  //fungsi untuk melakukan request data
  //dengan metode get ke end point API covid Indonesia
  getIdCovid(){
    return this.http.get(this.env.COVID_ID_API_URL).pipe(
      response => {
        return response;
      }
    )
  }  
  
  //fungsi untuk melakukan request data
  //dengan metode get ke end point API covid Dunia
  getWorldCovid(){
    return this.http.get(this.env.COVID_WORLD_API_URL).pipe(
      response => {
        return response;
      }
    )
  }

}
