import { Component, Input } from '@angular/core';
import { ProductInterface } from 'src/app/shared/models/product.interface';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent {

  @Input() product? : ProductInterface;
  @Input() index? : number;
}
