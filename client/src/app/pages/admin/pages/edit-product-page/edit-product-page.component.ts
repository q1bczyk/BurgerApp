import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.scss']
})
export class EditProductPageComponent implements OnInit 
{
  productFormSettings : any;
  productForm : FormGroup;
  product? : ProductInterface;

  constructor(private formService : FormService, private route: ActivatedRoute)
  {
    this.productFormSettings = formService.productFormSettings;
    this.productForm = formService.editProductForm;

    this.productFormSettings[6].required = false;
  }

  ngOnInit(): void 
  {
    this.route.data
      .subscribe(data => {
        this.product = data['product'];
      }, err => {
        console.log(err);
      });

      this.productForm.setValue({
        name :this.product?.name,
        price : this.product?.price,
        productType : this.product?.type,
        photo : []
      })
  }


}
