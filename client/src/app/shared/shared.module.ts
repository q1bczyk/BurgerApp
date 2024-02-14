import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './ui/logo/logo.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IngredientsPipe } from './pipes/ingredients.pipe';
import { ProductItemComponent } from './ui/product-item/product-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LogoComponent,
    LoaderComponent,
    NotFoundComponent,
    IngredientsPipe,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    LogoComponent,
    LoaderComponent,
    IngredientsPipe,
    ProductItemComponent,
  ]
})
export class SharedModule { }
