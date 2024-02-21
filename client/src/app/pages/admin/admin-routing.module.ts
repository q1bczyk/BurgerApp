import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
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
        path : 'zamowienia',
        component : OrdersPageComponent,
      },
      {
        path : 'produkty',
        component : ProductsPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
