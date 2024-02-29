import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(protected http : HttpClient){}

  protected baseUrl : string = environment.apiUrl;

  protected setHeaders() : HttpHeaders
  {
    const token = localStorage.getItem('token');
      
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

}
