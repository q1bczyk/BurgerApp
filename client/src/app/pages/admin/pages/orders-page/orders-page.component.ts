import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderDetailsIdInterface } from '../../models/order-details-id.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{

  orderStatus : string = 'nowe';
  isLoading : boolean = false;
  orders : OrderDetailsIdInterface[] = [];

  constructor(private orderService : OrderService, private route : ActivatedRoute, private store : Store<{adminStorage : LocalInterface}>, private router : Router){}
  
  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {
    this.orderStatus = params['order-status'];

    this.orderService.getOrders(this.orderStatus)
      .subscribe(res => {
        this.orders = res;
      })
  });
  }

  setStatus(status : string) : void
  {
    this.orderStatus = status;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 'order-status': status },
      queryParamsHandling: 'merge',
    });
  }
  
}
