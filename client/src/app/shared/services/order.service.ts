import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderRequestInterface } from '../models/order-request.interface';
import { OrderConfirmInterface } from '../models/order-confirm.interface';
import { OrderDetailsInterface } from '../models/order-details.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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


}
