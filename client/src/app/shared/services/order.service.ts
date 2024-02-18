import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderRequestInterface } from '../models/order-request.interface';
import { OrderConfirmInterface } from '../models/order-confirm.interface';

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


}
