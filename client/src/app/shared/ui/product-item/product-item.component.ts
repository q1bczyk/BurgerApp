import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CartInterface } from '../../store/cart-store/cart.state';
import { addProduct } from '../../store/cart-store/cart.action';

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

  constructor(private store : Store<{cartStorage : CartInterface}>){}

  addProductToCart(product : ProductInterface) : void
  {
    this.store.dispatch(addProduct({product : product}));
  }

}
