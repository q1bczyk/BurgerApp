import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RankingProductInterface } from 'src/app/pages/admin/shared/models/ranking-product.interface';
import { ProductInterface } from '../models/product.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends  BaseApiService{

  url : string = `${this.baseUrl}product`

  getBestsellers() : Observable<ProductInterface[]>
  {
    return this.http.get<ProductInterface[]>(`${this.url}/bestsellers`)
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

  getProducts(prodcutType : string) : Observable<ProductInterface[]>
  {
    return this.http.get<ProductInterface[]>(`${this.url}?searchTerm=${prodcutType.toLowerCase()}`)
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

  getProduct(productId : string) : Observable<ProductInterface>
  {
    const headers : HttpHeaders = this.setHeaders();

    return this.http.get<ProductInterface>(`${this.url}/${productId}`, {headers : headers})
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

  getRanking() : Observable<RankingProductInterface[]>
  {
    return this.http.get<RankingProductInterface[]>(`${this.url}/ranking`, { headers : this.setHeaders() })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  addProduct(productData : ProductInterface, img : File) : Observable<ProductInterface>
  {
    const headers : HttpHeaders = this.setHeaders();
    const formData = this.setFormData(productData, img);

    return this.http.post<ProductInterface>(this.url, formData, {headers : headers})
      .pipe(
        map(resData => {
          return resData;
        })
      )
   
  }

  editProduct(productData : ProductInterface, img? : File) : Observable<ProductInterface>
  {
    const headers : HttpHeaders = this.setHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = this.setFormData(productData, img);

    return this.http.put<ProductInterface>(`${this.url}/${productData.id}`, formData, {headers : headers})
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

  deleteProduct(productId : string) : Observable<{message : string}>
  {
    const headers : HttpHeaders = this.setHeaders();

    return this.http.delete<{message : string}>(this.url + `/${productId}`, {headers : headers })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  setFormData(productData : ProductInterface, img? : File) : FormData
  {
    const formData = new FormData();

    formData.append('price', productData.price.toString());
    formData.append('name', productData.name);
    formData.append('type', productData.type);

    if(img)
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

    return formData;
  }

}
