import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AuthGuard } from './auth.guard';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { adminFeautureKey, adminReducer } from './store/admin.reducer';
import { StoreModule } from '@ngrx/store';
import { OrderItemComponent } from './pages/orders-page/components/order-item/order-item.component';
import { OrderStatusFormComponent } from './pages/orders-page/components/order-status-form/order-status-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuResolver } from './pages/orders-page/orders-page.resolver';
import { ProductFormComponent } from './ui/product-form/product-form.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';

@NgModule({
  declarations: [
    OrdersPageComponent,
    ProductsPageComponent,
    AdminHomeComponent,
    OrderItemComponent,
    OrderStatusFormComponent,
    ProductFormComponent,
    AddProductPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(adminFeautureKey, adminReducer)
  ],
  providers: [
    AuthGuard,
    DatePipe,
    MenuResolver,
  ]
})
export class AdminModule { }
