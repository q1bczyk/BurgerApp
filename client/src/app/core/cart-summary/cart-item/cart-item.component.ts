import { Component, Input } from '@angular/core';
import { ProductInterface } from 'src/app/shared/models/product.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() product : ProductInterface | null = null;

}
