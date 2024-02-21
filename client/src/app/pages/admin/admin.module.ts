import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AuthGuard } from './auth.guard';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';

@NgModule({
  declarations: [
    OrdersPageComponent,
    ProductsPageComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule { }
