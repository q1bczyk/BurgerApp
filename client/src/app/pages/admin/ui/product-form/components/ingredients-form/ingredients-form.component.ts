import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientInterface } from 'src/app/pages/admin/shared/models/ingredient.interface';
import { IngredientsService } from 'src/app/pages/admin/shared/services/ingredients.service';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss']
})
export class IngredientsFormComponent implements OnInit
{

  @Input() productIngredients : IngredientInterface[] = [];
  @Output() closeFormEvent : EventEmitter<void> = new EventEmitter<void>();

  existingIngredients : IngredientInterface[] = [];

  constructor(private ingredientSrvice : IngredientsService){}
  
  ngOnInit() : void 
  {
    this.ingredientSrvice.fetchIngredients()
      .subscribe(data => {
        this.existingIngredients = data;
        this.compareArrays();
        this.sortArray();
      })
  }

  ingredientMarker(ingredientName : string)
  {
    const ingredient = this.existingIngredients.find(ingredient => ingredient.name === ingredientName);
    if(ingredient)
    {
      ingredient.isMarked = !ingredient.isMarked;
      this.sortArray();
    }
      
  }

  onCloseForm() : void
  {
    this.closeFormEvent.emit();
  }

  stopPropagation(event : any) : void
  {
    event.stopPropagation();
  }

  private sortArray() : void
  {
    this.existingIngredients.sort((a, b) => 
    {
      if (a.isMarked && !b.isMarked)
        return -1; 
      else if (!a.isMarked && b.isMarked)
        return 1;  
      else 
        return 0;  
    })
  }

  private compareArrays() : void
  {
    for(let i = 0; i < this.productIngredients.length; i++)
    {
      for(let j = 0; j < this.existingIngredients.length; j++)
      {
        if(this.productIngredients[i].name === this.existingIngredients[j].name)
          this.existingIngredients[j].isMarked = true;
      }
    }
  }

}
