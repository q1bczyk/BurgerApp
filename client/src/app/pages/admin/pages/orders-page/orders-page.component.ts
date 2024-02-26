import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { OrderDetailsIdInterface } from '../../shared/models/order-details-id.interface';
import { OrderHandleInterface } from '../../shared/models/order-handle.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  orderStatus : string = 'nowe';
  isLoading : boolean = true;
  orders : OrderDetailsIdInterface[] = [];
  formSettings? : {orderId : string, orderStatus : string, isFormOpen : boolean}

  constructor(private orderService : OrderService, private route : ActivatedRoute, private store : Store<{adminStorage : LocalInterface}>, private router : Router, private alertService : AlertService){}
  
  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {
    this.orderStatus = params['order-status'];

    this.orderService.getOrders(this.orderStatus)
      .subscribe(res => {
        this.orders = res;
        this.isLoading = false;
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
    
    if(data.option === 1)
    {
      this.formSettings = 
      {
        orderId : data.orderId,
        orderStatus : 'realizowane',
        isFormOpen : true,
      }
    }

    else if(data.option === 2)
    {
      this.formSettings = 
      {
        orderId : data.orderId,
        orderStatus : 'anulowane',
        isFormOpen : true,
      }
    }

    else if(data.option === 3)
    {
      const orderStatus : OrderHandleInterface = {orderStatus : 'zrealizowane'};
      this.handleOrderApi(data.orderId, orderStatus);
    }
      
      
  }

  handleOrder(childData : any)
  {
    if(this.formSettings)
      this.formSettings.isFormOpen = false;

    console.log(childData);

    const data : OrderHandleInterface = 
    {
      orderStatus : childData.orderStatus, 
      waitingTime : childData.waitingTime,
      refusalReason : childData.refusalReason,
    }
    this.handleOrderApi(childData.orderId, data);
  }

  closeForm() : void
  {
    if(this.formSettings)
      this.formSettings.isFormOpen = false;
  }

  private handleOrderApi(orderId : string, data : OrderHandleInterface)
  {
    this.isLoading = true;
    this.orderService.handleOrder(orderId, data)
        .subscribe(res => {
          this.orders = this.orders.filter(order => order.id !== orderId);
          this.isLoading = false;
        }, err => {
          console.log(err)
          this.alertService.ShowAlert('Błąd', err.message, 'spróbuj ponownie później', this.alertHost);
          this.isLoading = false;
        })
  }

}
