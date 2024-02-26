import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(protected http : HttpClient){}

  protected baseUrl : string = "https://localhost:5001/api/";

  protected setHeaders() : HttpHeaders
  {
    const token = localStorage.getItem('token');
      
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

}
