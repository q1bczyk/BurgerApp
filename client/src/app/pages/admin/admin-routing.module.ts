import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { DayOffsPageComponent } from './pages/day-offs-page/day-offs-page.component';
import { EditProductPageComponent } from './pages/edit-product-page/edit-product-page.component';
import { EditProductResolver } from './pages/edit-product-page/edit-product.resolver';
import { IngredientEditPageComponent } from './pages/ingredient-edit-page/ingredient-edit-page.component';
import { EditIngredientResolver } from './pages/ingredient-edit-page/ingredient-edit-page.resolver';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { IngredientsPageResolver } from './pages/ingredients-page/ingredients-page.resolver';
import { OpeningHoursEditComponent } from './pages/opening-hours-edit/opening-hours-edit.component';
import { OpeningHoursResolver } from './pages/opening-hours-edit/opening-hours.resolver';
import { OpeningHoursPageComponent } from './pages/opening-hours-page/opening-hours-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { MenuResolver } from './pages/orders-page/orders-page.resolver';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';
import { RankingResolver } from './pages/ranking-page/ranking-page.resolver';

const routes: Routes = 
[
  {
    path : '',
    component : AdminComponent,
    canActivate : [AuthGuard],
    children : 
    [
      {
        path : '',
        component : AdminHomeComponent,
      },
      {
        path : 'zamowienia',
        component : OrdersPageComponent,
      },
      {
        path : 'produkty',
        component : ProductsPageComponent,
        resolve : {products : MenuResolver},
      },
      {
        path : 'produkty/dodaj',
        component : AddProductPageComponent,
      },
      {
        path : 'produkty/edytuj/:productId',
        component : EditProductPageComponent,
        resolve : { product : EditProductResolver }
      },
      {
        path : 'skladniki',
        component : IngredientsPageComponent,
        resolve : { ingredients : IngredientsPageResolver }
      },
      {
        path : 'skladniki/:ingredientId',
        component : IngredientEditPageComponent,
        resolve : {ingredient : EditIngredientResolver}
      },
      {
        path : 'godziny-otwarcia',
        component : OpeningHoursPageComponent,
      },
      {
        path : 'godziny-otwarcia/:openingHourId',
        component : OpeningHoursEditComponent,
        resolve : { openingHour : OpeningHoursResolver },
      },
      {
        path : 'dni-wolne',
        component : DayOffsPageComponent,
      },
      {
        path : 'kontakt',
        component : ContactPageComponent,
      },
      {
        path : 'ranking',
        component : RankingPageComponent,
        resolve : { ranking : RankingResolver }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
