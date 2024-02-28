import { Component, Input } from '@angular/core';
import { RankingProductInterface } from 'src/app/pages/admin/shared/models/ranking-product.interface';

@Component({
  selector: 'app-ranking-item',
  templateUrl: './ranking-item.component.html',
  styleUrls: ['./ranking-item.component.scss']
})
export class RankingItemComponent 
{

  @Input() item? : RankingProductInterface;
  @Input() index? : number;

}
