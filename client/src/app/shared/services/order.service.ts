import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderRequestInterface } from '../models/order-request.interface';
import { OrderConfirmInterface } from '../models/order-confirm.interface';
import { OrderDetailsInterface } from '../models/order-details.interface';
import { OrderDetailsIdInterface } from 'src/app/pages/admin/models/order-details-id.interface';

@Injectable({
  providedIn: 'root'
})

export class OrderService 
{

  url : string = "https://localhost:5001/api/order"

  constructor(private http : HttpClient){}

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
