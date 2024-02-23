import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent 
{
  @Input() productForm? : FormGroup;
  @Input() productFormSettings : any;

  onSubmitForm(value : any)
  {
    console.log(value);
  }

  changeProductType(value : string)
  {
    this.productForm?.get('productType')?.setValue(value);
  }

}
