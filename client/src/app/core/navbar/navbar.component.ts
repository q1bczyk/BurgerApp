import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartInterface } from 'src/app/shared/store/cart-store/cart.state';
import { MobileComponent } from './components/mobile/mobile.component';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { setCartVisiblity } from 'src/app/shared/store/cart-store/cart.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  
  @ViewChild(MobileComponent) mobileComponent !: MobileComponent;

  faBasketShopping = faBasketShopping; 

  constructor(private router : Router, private activatedRoute: ActivatedRoute, private store : Store<{cartStorage : CartInterface}>){}

  cart$! : Observable<CartInterface>
  cartSubscription: Subscription | undefined;

  cart : CartInterface | null = null;

  ngOnInit(): void 
  {
    this.cart$ = this.store.select('cartStorage');
    this.cartSubscription = this.cart$
      .subscribe(data => {
        this.cart = data;
      })
  }

  openMenu() : void
  {
    this.mobileComponent.menuState(true);
  }

  navigate() : void
  {
    this.router.navigate(['menu'], { relativeTo: this.activatedRoute, queryParams: { 'product-type': 'burger' } });
  }

  showCart() : void
  {
    this.store.dispatch(setCartVisiblity());
  }

}
