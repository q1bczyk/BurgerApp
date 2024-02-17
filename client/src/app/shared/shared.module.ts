import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './ui/logo/logo.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IngredientsPipe } from './pipes/ingredients.pipe';
import { ProductItemComponent } from './ui/product-item/product-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormComponent } from './ui/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LogoComponent,
    LoaderComponent,
    NotFoundComponent,
    IngredientsPipe,
    ProductItemComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    LogoComponent,
    LoaderComponent,
    IngredientsPipe,
    ProductItemComponent,
    FormComponent,
  ]
})
export class SharedModule { }
