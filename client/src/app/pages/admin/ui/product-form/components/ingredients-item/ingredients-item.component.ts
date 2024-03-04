import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngredientInterface } from 'src/app/pages/admin/shared/models/ingredient.interface';
import { faPlus, faMinus, faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ingredients-item',
  templateUrl: './ingredients-item.component.html',
  styleUrls: ['./ingredients-item.component.scss']
})
export class IngredientsItemComponent {

  faPlus = faPlus;
  faMinus = faMinus;
  faRemove = faRemove;

  @Input() ingredient? : IngredientInterface;
  @Output() removeItemEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output() changeQuantityEvent : EventEmitter<{value : number, ingredientName : string}> = new EventEmitter<{value : number, ingredientName : string}>();

  onRemoveItem(ingredientName : string) : void
  {
    this.removeItemEvent.emit(ingredientName);
  }

  onChangeQuantity(value : number) : void
  {
    if(value < 0 && this.ingredient?.quantity === 1)
      return

    if(this.ingredient)
    {
      const newQuantity = this.ingredient.quantity + value
      this.changeQuantityEvent.emit({value : newQuantity , ingredientName : this.ingredient?.name});
    }
      
  }

}
