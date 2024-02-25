import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
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
  @Input() product : ProductInterface =
  {
    id : '',
    price : 1,
    name : '',
    type : '',
    quantity : 1,
    imgUrl : '',
    ingredients : [],
  }


  imageSrc? : string ;
  isIngredientFormOpen : boolean = false;
  file? : File;

  constructor(private productService : ProductService){}

  onSubmitForm(value : any) : void
  {
    if(this.productForm?.invalid)
      return

    const newProduct = 
    {
      id : '',
      price : value.price,
      name : value.name,
      type : this.productForm?.get('productType')?.value,
      quantity : 0,
      imgUrl : '',
      ingredients : this.product.ingredients
    }

    if(this.file)
    this.productService.AddProduct(newProduct, this.file)
      .subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err);
      })

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
    this.file = file;
    this.imageSrc = window.URL.createObjectURL(file);
  }

  changeProductType(value : string)
  {
    this.productForm?.get('productType')?.setValue(value);
  }

  changeIngredientQuantity(value : any)
  {
    const index = this.product.ingredients.findIndex(ingredient => ingredient.name === value.ingredientName)

    if(index >= 0)
      this.product.ingredients[index].quantity = value.value;
    
  }

  removeIngredient(ingredientName : string)
  {
    this.product.ingredients = this.product.ingredients.filter(x => x.name !== ingredientName)
  }

  addIngredient(ingredient : IngredientInterface)
  {
    this.product.ingredients.push(ingredient);
  }

}
