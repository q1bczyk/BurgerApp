import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IngredientInterface } from '../../shared/models/ingredient.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent 
{
  faCamera = faCamera;
  faPlus = faPlus;
 
  @Input() productForm? : FormGroup;
  @Input() productFormSettings : any;

  productIngredients : IngredientInterface[] = 
  [
    {
      name : 'bułka',
      price : 5,
      quantity: 1,
      isMarked : true,
      id : 'xd'
    }
  ]

  imageSrc? : string ;
  isIngredientFormOpen : boolean = true;

  onSubmitForm(value : any)
  {
    console.log(value);
  }

  openIngredientForm() : void
  {
    this.isIngredientFormOpen = true;
  }

  closeIngredientForm() : void
  {
    this.isIngredientFormOpen = false;
  }

  onFileSelect(file : File) : void 
  {
    this.imageSrc = window.URL.createObjectURL(file);
  }

  changeProductType(value : string)
  {
    this.productForm?.get('productType')?.setValue(value);
  }

}
