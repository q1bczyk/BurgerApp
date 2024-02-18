import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CartInterface } from '../../store/cart-store/cart.state';
import { addProduct } from '../../store/cart-store/cart.action';
import { OrderPossibilityService } from '../../services/order-possibility.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  faCartShopping = faCartShopping;

  @Input() product : ProductInterface | null = null;
  @Input() index : number = 0;
  @Input() marginTop : boolean = false;

  constructor(private store : Store<{cartStorage : CartInterface}>, private orderPossibilityService : OrderPossibilityService){}

  addProductToCart(product : ProductInterface) : void
  {
    if(this.orderPossibilityService.checkOrderPossibility() !== true)
      return;
    this.store.dispatch(addProduct({product : product}));
  }

}
