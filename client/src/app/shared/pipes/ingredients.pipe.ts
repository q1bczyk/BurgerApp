import { Pipe, PipeTransform } from '@angular/core';
import { IngredientResponseInterface } from '../models/ingredient-response.interface';

@Pipe({
  name: 'ingredientsPipe'
})
export class IngredientsPipe implements PipeTransform {

  transform(ingredients : IngredientResponseInterface[]) : string 
  {
    let ingredientString : string = '';
    ingredients.forEach((ingredient, index) => {
        if(index == 0 || index == ingredientString.length)
          ingredientString += ingredient.name;
        else
          ingredientString += ` • ${ingredient.name}`
    });

    return ingredientString;
  }

}
