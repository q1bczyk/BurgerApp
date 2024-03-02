import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  constructor(private formService : FormService, private title : Title)
  {
    this.productForm = formService.productForm;
    this.productFormSettings = formService.productFormSettings;

    const dataToParse = localStorage.getItem('activeAdminData');
    if(dataToParse)
    {
      const data = JSON.parse(dataToParse);
      this.title.setTitle(`${data.name} | Dodaj Produkt`);
    }
  }
}
