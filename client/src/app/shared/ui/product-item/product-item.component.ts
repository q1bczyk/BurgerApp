import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { faCartShopping, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CartInterface } from '../../store/cart-store/cart.state';
import { addProduct } from '../../store/cart-store/cart.action';
import { OrderPossibilityService } from '../../services/order-possibility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  faCartShopping = faCartShopping;
  faEdit = faEdit;
  faRemove = faRemove;

  @Input() product : ProductInterface | null = null;
  @Input() index : number = 0;
  @Input() marginTop : boolean = false;
  @Input() admin? : boolean;
  @Output() alertEvent : EventEmitter<string> = new EventEmitter();
  @Output() deleteProductEvent : EventEmitter<string> = new EventEmitter();
  @Output() editProductEvent : EventEmitter<string> = new EventEmitter();
  

  constructor(private store : Store<{cartStorage : CartInterface}>, private orderPossibilityService : OrderPossibilityService, private router : Router, private activatedRoute : ActivatedRoute){}

  addProductToCart(product : ProductInterface) : void
  {
    var orderStatus = this.orderPossibilityService.checkOrderPossibility();

    if(typeof orderStatus === 'string' && orderStatus !== 'completed')
    {
      this.alertEvent.emit(orderStatus);
      return
    }
      
    this.store.dispatch(addProduct({product : product}));
  }

  onEditClick() : void
  {
    this.router.navigate([`edytuj/${this.product?.id}`], { relativeTo: this.activatedRoute});
  }

  onDeleteClick() : void
  {
    if(this.product)
      this.deleteProductEvent.emit(this.product.id);

    return;
  }

}
