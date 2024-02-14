import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

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

}
