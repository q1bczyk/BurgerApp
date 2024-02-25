import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductInterface } from '../models/product.interface';
import { deleteProduct } from '../store/cart-store/cart.action';
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
    if(productData.ingredients.length < 1)
      formData.append('ingredients', JSON.stringify(productData.ingredients))
    for(let i = 0; i < productData.ingredients.length; i++)
    {
      const keyPrefix = `ingredients[${i.toString()}].`;
      formData.append(keyPrefix + 'price', productData.ingredients[i].price.toString());
      formData.append(keyPrefix + 'name', productData.ingredients[i].name);
      formData.append(keyPrefix + 'quantity', productData.ingredients[i].quantity.toString());
    }

    return this.http.post<ProductInterface>(this.url, formData, {headers : headers})
      .pipe(
        map(resData => {
          return resData;
        })
      )
   
  }

  deleteProduct(productId : string) : Observable<{message : string}>
  {
    const headers : HttpHeaders = this.baseApiService.setHeaders();

    return this.http.delete<{message : string}>(this.url + `/${productId}`, {headers : headers })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

}
