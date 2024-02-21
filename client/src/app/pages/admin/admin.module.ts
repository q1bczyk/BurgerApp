import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AuthGuard } from './auth.guard';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { adminFeautureKey, adminReducer } from './store/admin.reducer';
import { StoreModule } from '@ngrx/store';
import { OrderItemComponent } from './pages/orders-page/components/order-item/order-item.component';

@NgModule({
  declarations: [
    OrdersPageComponent,
    ProductsPageComponent,
    AdminHomeComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature(adminFeautureKey, adminReducer)
  ],
  providers: [
    AuthGuard,
  ]
})
export class AdminModule { }
