import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { IngredientInterface } from '../../shared/models/ingredient.interface';
import { IngredientService } from '../ingredients-page/services/ingredients-page.service';

@Component({
  selector: 'app-ingredient-edit-page',
  templateUrl: './ingredient-edit-page.component.html',
  styleUrls: ['./ingredient-edit-page.component.scss']
})
export class IngredientEditPageComponent implements OnInit
{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  ingredient? : IngredientInterface;
  form : FormGroup = this.formService.ingredientForm;
  formSettings : any = this.formService.ingredientFormSettings;
  isLoading : boolean = false;

  constructor(private route : ActivatedRoute, private ingredientService : IngredientService, private alertService : AlertService, private formService : FormService){}

  ngOnInit(): void 
  {
    this.route.data
      .subscribe(data => {
        this.ingredient = data['ingredient']
      })

      this.form.setValue({
        name : this.ingredient?.name,
        price : this.ingredient?.price,
      })
  }

  editIngredient(value : any) : void
  {
    if(!this.ingredient)
      return
  
    const editedProduct : IngredientInterface = 
    {
      id : this.ingredient.id,
      name : value.name,
      price : value.price,
      quantity : this.ingredient.quantity,
      isMarked : false,
    }

    this.isLoading = true;
    this.ingredientService.editIngredient(editedProduct)
      .subscribe(data => {
        this.isLoading = false;
        this.alertService.ShowAlert('Sukces', 'pomyslnie edytowano składnik', '', this.alertHost)
      }, err => {
        this.alertService.ShowAlert('Błąd', err.message, '', this.alertHost)
        this.isLoading = false;
      })

  }

}
