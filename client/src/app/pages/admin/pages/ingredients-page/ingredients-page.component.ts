import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { IngredientInterface } from '../../shared/models/ingredient.interface';
import { IngredientsService } from '../../shared/services/ingredients.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss']
})
export class IngredientsPageComponent implements OnInit
{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  ingredients : IngredientInterface[] = [];
  isLoading : boolean = false

  constructor(private route : ActivatedRoute, private ingredientService : IngredientsService, private alertService : AlertService){}

  ngOnInit(): void 
  {
    this.route.data
      .subscribe(data => {
        this.ingredients = data['ingredients']
      }, err => {
        console.log(err)
      })
  }

  deleteIngredient(ingredientId : string)
  {
    this.isLoading = true;
    this.ingredientService.deleteIngredient(ingredientId)
      .subscribe(res => {
        this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== ingredientId);
        this.isLoading = false;
      }, err => {
        this.alertService.ShowAlert('Błąd', err.message, '', this.alertHost)
        this.isLoading = false;
      })
  }

}
