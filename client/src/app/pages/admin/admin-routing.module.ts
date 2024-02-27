import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { EditProductPageComponent } from './pages/edit-product-page/edit-product-page.component';
import { EditProductResolver } from './pages/edit-product-page/edit-product.resolver';
import { IngredientEditPageComponent } from './pages/ingredient-edit-page/ingredient-edit-page.component';
import { EditIngredientResolver } from './pages/ingredient-edit-page/ingredient-edit-page.resolver';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { IngredientsPageResolver } from './pages/ingredients-page/ingredients-page.resolver';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { MenuResolver } from './pages/orders-page/orders-page.resolver';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

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
        resolve : {product : EditProductResolver}
      },
      {
        path : 'skladniki',
        component : IngredientsPageComponent,
        resolve : {ingredients : IngredientsPageResolver}
      },
      {
        path : 'skladniki/:ingredientId',
        component : IngredientEditPageComponent,
        resolve : {ingredient : EditIngredientResolver}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
