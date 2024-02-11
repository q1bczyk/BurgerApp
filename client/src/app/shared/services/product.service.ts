import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = "https://localhost:5001/api/product"

  constructor(private http : HttpClient){}

  GetBestsellers() : Observable<ProductInterface[]>
  {
    return this.http.get<ProductInterface[]>(`${this.url}/bestsellers`)
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

}
