import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() removeItemEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output() addItemEvent : EventEmitter<IngredientInterface> = new EventEmitter<IngredientInterface>();
  @Output() addNewItemEvent : EventEmitter<IngredientInterface> = new EventEmitter<IngredientInterface>();

  ingredientForm : FormGroup = this.fb.group(
    {
      name : ['', [Validators.required, Validators.minLength(2)]],
      price : [1, [Validators.required, Validators.min(1)]]
    })
  existingIngredients : IngredientInterface[] = [];

  constructor(private ingredientSrvice : IngredientsService, private fb : FormBuilder){}
  
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

      if(ingredient.isMarked === false)
        this.removeItemEvent.emit(ingredient.name);

      else
        this.addItemEvent.emit(ingredient);
    }    
  }

  onSubmit() : void
  {
    if(this.ingredientForm.invalid)
      return
    
    const newIngredient : IngredientInterface =
    {
      id : '',
      price : this.ingredientForm.get('price')?.value,
      name : this.ingredientForm.get('name')?.value,
      quantity : 1,
      isMarked : false, 
    }

    this.addNewItemEvent.emit(newIngredient);
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
