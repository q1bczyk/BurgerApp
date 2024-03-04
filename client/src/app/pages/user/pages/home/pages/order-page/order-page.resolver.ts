import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, map, catchError, of } from "rxjs";
import { OrderDetailsInterface } from "src/app/shared/models/order-details.interface";
import { OrderService } from "src/app/shared/services/order.service";

@Injectable()
export class OrderResolver implements Resolve<OrderDetailsInterface | null>
{
    constructor(private orderService : OrderService, private router : Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrderDetailsInterface | Observable<OrderDetailsInterface | null> | Promise<OrderDetailsInterface | OrderDetailsInterface> 
    {
        return this.orderService.orderDetails(route.params['orderId'])
            .pipe(
                map(resData => {
                    const orderDetails: OrderDetailsInterface = 
                    {
                        id : resData.id,
                        orderStatus: resData.orderStatus,
                        waitingTime: resData.waitingTime,
                        refusalReason: resData.refusalReason,
                        clientsContact: resData.clientsContact,
                        localId : resData.localId,
                      };
                      return orderDetails;
                }),
                catchError(err => {
                    this.router.navigate(['not-found']);
                    return of(null);
                })
            )           
    }
}