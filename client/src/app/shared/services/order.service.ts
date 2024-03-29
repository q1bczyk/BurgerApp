import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderRequestInterface } from '../models/order-request.interface';
import { OrderConfirmInterface } from '../models/order-confirm.interface';
import { OrderDetailsInterface } from '../models/order-details.interface';
import { OrderDetailsIdInterface } from 'src/app/pages/admin/shared/models/order-details-id.interface';
import { OrderHandleInterface } from 'src/app/pages/admin/shared/models/order-handle.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService extends BaseApiService
{

  url : string = this.baseUrl + "order"

  placeOrder(data : OrderRequestInterface) : Observable<OrderConfirmInterface>
  {
    return this.http.post<OrderConfirmInterface>(this.url, data)
        .pipe(
            map(resData => {
                return resData;
            })
        )
  }

  orderDetails(orderId : string) : Observable<OrderDetailsInterface>
  {
    return this.http.get<OrderDetailsInterface>(`${this.url}/${orderId}`)
      .pipe(
        map(resData => {
          return resData
        })
      )
  }

  handleOrder(orderId : string, data : OrderHandleInterface) : Observable<OrderDetailsIdInterface>
  {
    const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      });

    return this.http.put<OrderDetailsIdInterface>(`${this.url}/${orderId}`, data, {headers : headers})
          .pipe(
              map(res => {
                  return res;
              })
          )
  }

  getOrders(orderStatus : string) : Observable<OrderDetailsIdInterface[]>
  {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      });

      return this.http.get<OrderDetailsIdInterface[]>(`${this.url}?orderStatus=${orderStatus}`, {headers : headers})
          .pipe(
              map(res => {
                  return res;
              })
          )
  }


}
