import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent 
{
  productForm : FormGroup;
  productFormSettings : any;

  constructor(private formService : FormService)
  {
    this.productForm = formService.productForm;
    this.productFormSettings = formService.productFormSettings;
  }
}
