import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-canceled-order',
  templateUrl: './canceled-order.component.html',
  styleUrls: ['./canceled-order.component.scss']
})
export class CanceledOrderComponent {

  @Input() refusalReason? : string;

}
