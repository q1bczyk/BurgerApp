import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { OrderDetailsIdInterface } from '../../models/order-details-id.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  orderStatus : string = 'nowe';
  isLoading : boolean = false;
  orders : OrderDetailsIdInterface[] = [];

  constructor(private orderService : OrderService, private route : ActivatedRoute, private store : Store<{adminStorage : LocalInterface}>, private router : Router, private alertService : AlertService){}
  
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

    this.orderService.getOrders(this.orderStatus)
    .subscribe(res => {
      this.orders = res;
    }, err => {
      console.log(err);
      this.alertService.ShowAlert('Błąd', '', err.message, this.alertHost);
    })
  }

  onChildButtonSubmit(data : any)
  {
    console.log(data.option)
    if(data.option === 3)
    {
      this.orderService.handleOrder(data.orderId, {orderStatus : 'zrealizowane'})
        .subscribe(res => {
          this.orders = this.orders.filter(order => order.id !== data.orderId);
        }, err => {
          console.log(err);
        })
    }
  }

}
