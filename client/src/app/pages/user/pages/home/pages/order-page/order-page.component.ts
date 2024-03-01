import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderDetailsInterface } from 'src/app/shared/models/order-details.interface';
import { OrderHubService } from 'src/app/shared/services/order-hub.service';
import { clearCart } from 'src/app/shared/store/cart-store/cart.action';
import { CartInterface } from 'src/app/shared/store/cart-store/cart.state';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit
{
  @ViewChild('element') menuRef!: ElementRef;
  
  constructor(
    private route: ActivatedRoute, 
    private store : Store<{cartStorage : CartInterface}>, 
    private orderHubService : OrderHubService
  ){}
  
  orderDetails? : OrderDetailsInterface;

  ngOnInit(): void 
  {
      
    this.store.dispatch(clearCart());
    this.route.data
      .subscribe((data: any) => {
        this.orderDetails = data.orderDetails;
      }, err => {
        console.log(err);
      });
  }

  ngAfterViewInit(): void 
  {
    this.scrollToElement();
  }

  scrollToElement() 
  {
    this.menuRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
;
}
