import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated() : boolean
  {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token : string) : boolean
  {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate === null || expirationDate.valueOf() < new Date().valueOf();
  }

  private getTokenExpirationDate(token : string) : Date | null
  {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp)
      return new Date(decodedToken.exp * 1000);

    return null;
  }
}
