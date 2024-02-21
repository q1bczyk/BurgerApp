import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDetailsIdInterface } from 'src/app/pages/admin/models/order-details-id.interface';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @Input() order? : OrderDetailsIdInterface;
  @Output() optionEvent : EventEmitter<{option : number, orderId : string}> = new EventEmitter();

  onButtonSubmit(option : number) : void
  {
    if(this.order)
      this.optionEvent.emit({option : option, orderId : this.order.id});
    return
  }

}
