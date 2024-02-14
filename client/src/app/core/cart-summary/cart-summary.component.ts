import { Component } from '@angular/core';
import { faShippingFast, faBagShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {

  faShippingFast = faShippingFast;
  faBagShopping = faBagShopping

  isDelivery : boolean = false;

  setDelivery(value : boolean) : void
  {
    this.isDelivery = value;
  }

}
