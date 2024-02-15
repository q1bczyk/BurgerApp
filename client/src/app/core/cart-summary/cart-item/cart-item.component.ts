import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { addProduct, deleteProduct } from 'src/app/shared/store/cart-store/cart.action';
import { CartInterface } from 'src/app/shared/store/cart-store/cart.state';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() product : ProductInterface | null = null;
  @Input() index : number = 0;

  constructor(private store : Store<{cartStorage : CartInterface}>){}

  incrementProduct() : void
  {
    if(this.product)
      this.store.dispatch(addProduct({product : this.product}));
  }

  decrementProduct() : void
  {
    if(this.product)
    this.store.dispatch(deleteProduct({productName : this.product.name}));
  }

}
