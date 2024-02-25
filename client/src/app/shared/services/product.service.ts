import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductInterface } from '../models/product.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = "https://localhost:5001/api/product"

  constructor(private http : HttpClient, private baseApiService : BaseApiService){}

  GetBestsellers() : Observable<ProductInterface[]>
  {
    return this.http.get<ProductInterface[]>(`${this.url}/bestsellers`)
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

  GetProducts(prodcutType : string) : Observable<ProductInterface[]>
  {
    return this.http.get<ProductInterface[]>(`${this.url}?searchTerm=${prodcutType.toLowerCase()}`)
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

  AddProduct(productData : ProductInterface, img : File) : Observable<ProductInterface>
  {
    const headers : HttpHeaders = this.baseApiService.setHeaders();

    const formData = new FormData();

    formData.append('price', productData.price.toString());
    formData.append('name', productData.name);
    formData.append('type', productData.type);
    formData.append('file', img);
    formData.append('ingredients', JSON.stringify(productData.ingredients));

    return this.http.post<ProductInterface>(this.url, formData, {headers : headers})
      .pipe(
        map(resData => {
          return resData;
        })
      )
   
  }

}
