import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShippingFast, faBagShopping, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { setCartVisiblity, setDeliveryState } from 'src/app/shared/store/cart-store/cart.action';
import { CartInterface } from 'src/app/shared/store/cart-store/cart.state';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit, OnDestroy{

  faShippingFast = faShippingFast;
  faBagShopping = faBagShopping
  faRemove = faRemove;

  cart$! : Observable<CartInterface>
  cartSubscription: Subscription | undefined;

  cart? : CartInterface;

  constructor(private store : Store<{cartStorage : CartInterface}>, private router : Router, private activatedRoute : ActivatedRoute){}
  
  ngOnInit(): void 
  {
    this.cart$ = this.store.select('cartStorage');
    this.cartSubscription = this.cart$
      .subscribe(data => {
        this.cart = data;
      })
  }

  ngOnDestroy(): void 
  {
    if(this.cartSubscription)
      this.cartSubscription.unsubscribe();
  }

  setDelivery(value : boolean) : void
  {
    this.store.dispatch(setDeliveryState({value : value}));
  }

  hideCart() : void
  {
    this.store.dispatch(setCartVisiblity());
  }

  navigate() : void
  {
    this.hideCart();
    this.router.navigate(['zamowienie'], { relativeTo: this.activatedRoute});
  }

}
