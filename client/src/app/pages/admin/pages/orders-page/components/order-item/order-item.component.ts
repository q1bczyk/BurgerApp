import { Component, Input } from '@angular/core';
import { OrderDetailsIdInterface } from 'src/app/pages/admin/models/order-details-id.interface';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @Input() order? : OrderDetailsIdInterface;

}
