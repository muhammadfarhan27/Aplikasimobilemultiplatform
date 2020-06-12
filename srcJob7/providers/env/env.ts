import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnvProvider {

  API_URL = 'https://ecommerce.jaroji.web.id/api/';
  COVID_WORLD_API_URL = 'https://api.covid19api.com/world/total';
  COVID_ID_API_URL = 'https://kawalcovid19.harippe.id/api/summary';

  constructor(public http: HttpClient) {
  }

}
