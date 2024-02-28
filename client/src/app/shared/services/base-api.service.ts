import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/assets/env/env.development';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(protected http : HttpClient){}

  protected baseUrl : string = env.apiUrl;

  protected setHeaders() : HttpHeaders
  {
    const token = localStorage.getItem('token');
      
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

}
