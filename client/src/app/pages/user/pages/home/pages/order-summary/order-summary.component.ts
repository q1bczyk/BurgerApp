import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartInterface } from 'src/app/shared/store/cart-store/cart.state';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent 
{

  cart$! : Observable<CartInterface>
  cartSubscription: Subscription | undefined;

  cart? : CartInterface;

  constructor(private store : Store<{cartStorage : CartInterface}>, private router : Router){}
  
  ngOnInit(): void 
  {
    this.cart$ = this.store.select('cartStorage');
    this.cartSubscription = this.cart$
      .subscribe(data => {
        if(data.products.length === 0)
          this.router.navigate(['not-found']);
        this.cart = data;
      })
  }

  ngOnDestroy(): void 
  {
    if(this.cartSubscription)
      this.cartSubscription.unsubscribe();
  }

}
