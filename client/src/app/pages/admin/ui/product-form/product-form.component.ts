import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { IngredientInterface } from '../../shared/models/ingredient.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit 
{
  faCamera = faCamera;
  faPlus = faPlus;

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;
  
  @Input() productForm? : FormGroup;
  @Input() productFormSettings : any;
  @Input() product : ProductInterface = this.initializeStartProduct();
  @Input() editMode? : boolean;


  imageSrc? : string ;
  isIngredientFormOpen : boolean = false;
  file? : File;
  isLoading : boolean = false;

  constructor(private productService : ProductService, private alertService : AlertService){}

  ngOnInit(): void 
  {
    if(this.editMode)
      this.imageSrc = this.product.imgUrl;
  }

  onSubmitForm(value : any) : void
  {
    if(this.productForm?.invalid)
      return

    this.isLoading = true;
    
    const newProduct : ProductInterface = 
    {
      id : this.product.id,
      price : value.price,
      name : value.name,
      type : this.productForm?.get('productType')?.value,
      quantity : 0,
      imgUrl : '',
      ingredients : this.product.ingredients
    }

    if(!this.editMode)
      this.addProduct(newProduct);
    
    else
      this.editProduct(newProduct);

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

  private initializeStartProduct() : ProductInterface
  {
    const product : ProductInterface =
    {
      id : '',
      price : 1,
      name : '',
      type : '',
      quantity : 1,
      imgUrl : '',
      ingredients : [],
    }

    this.imageSrc = undefined;
    this.productForm?.get('productType')?.setValue('burger');
    this.productForm?.get('name')?.setValue('');
    this.productForm?.get('price')?.setValue(10);
    
    return product;
  }

  private addProduct(newProduct : ProductInterface) : void
  {
    if(this.file)
    this.productService.AddProduct(newProduct, this.file)
      .subscribe(res => {
        this.alertService.ShowAlert('Sukces', 'pomyslnie dodano produkt', '', this.alertHost)
        this.isLoading = false;
        this.product = this.initializeStartProduct();
      }, err => {
        this.alertService.ShowAlert('Błąd', err.message, '', this.alertHost)
        this.isLoading = false;
        console.log(err);
      })
  }

  private editProduct(editedProduct : ProductInterface)
  {
    this.productService.editProduct(editedProduct, this.file)
      .subscribe(res => {
        this.alertService.ShowAlert('Sukces', 'pomyslnie zedytowano produkt', '', this.alertHost)
        this.isLoading = false;
        this.product = this.initializeStartProduct();
      }, err => {
        this.alertService.ShowAlert('Błąd', err.message, '', this.alertHost)
        this.isLoading = false;
        console.log(err);
      })
  }

}
