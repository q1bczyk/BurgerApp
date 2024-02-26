import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient-admin-item',
  templateUrl: './ingredient-admin-item.component.html',
  styleUrls: ['./ingredient-admin-item.component.scss']
})
export class IngredientAdminItemComponent 
{
  @Input() name? : string;
  @Input() price? : number;
  @Input() index? : number;
}
