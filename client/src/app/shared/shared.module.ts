import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IngredientsPipe } from './pipes/ingredients.pipe';

@NgModule({
  declarations: [
    LogoComponent,
    LoaderComponent,
    NotFoundComponent,
    IngredientsPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoComponent,
    LoaderComponent,
    IngredientsPipe
  ]
})
export class SharedModule { }
