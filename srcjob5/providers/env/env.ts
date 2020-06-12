import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EnvProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnvProvider {
  API_URL = 'https://ecommerce.jaroji.web.id/api/';
  COVID_WORLD_API_URL = 'https://api.covid19api.com/world/total';
  COVID_ID_API_URL = 'https://kawalcovid19.harippe.id/api/summary';


  constructor(public http: HttpClient)
   { }

}
