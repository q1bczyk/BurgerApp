import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
