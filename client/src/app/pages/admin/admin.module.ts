import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AuthGuard } from './auth.guard';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderItemComponent } from './pages/orders-page/components/order-item/order-item.component';
import { OrderStatusFormComponent } from './pages/orders-page/components/order-status-form/order-status-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuResolver } from './pages/orders-page/orders-page.resolver';
import { ProductFormComponent } from './ui/product-form/product-form.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IngredientsFormComponent } from './ui/product-form/components/ingredients-form/ingredients-form.component';
import { IngredientsItemComponent } from './ui/product-form/components/ingredients-item/ingredients-item.component';
import { EditProductPageComponent } from './pages/edit-product-page/edit-product-page.component';
import { EditProductResolver } from './pages/edit-product-page/edit-product.resolver';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { IngredientsPageResolver } from './pages/ingredients-page/ingredients-page.resolver';
import { IngredientAdminItemComponent } from './pages/ingredients-page/components/ingredient-admin-item/ingredient-admin-item.component';
import { IngredientEditPageComponent } from './pages/ingredient-edit-page/ingredient-edit-page.component';
import { EditIngredientResolver } from './pages/ingredient-edit-page/ingredient-edit-page.resolver';
import { OpeningHoursPageComponent } from './pages/opening-hours-page/opening-hours-page.component';
import { OpeningHoursItemComponent } from './pages/opening-hours-page/components/opening-hours-item/opening-hours-item.component';
import { OpeningHoursEditComponent } from './pages/opening-hours-edit/opening-hours-edit.component';
import { OpeningHoursResolver } from './pages/opening-hours-edit/opening-hours.resolver';
import { TimeConvertService } from './pages/opening-hours-edit/services/time-convert.service';
import { DayOffsPageComponent } from './pages/day-offs-page/day-offs-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    OrdersPageComponent,
    ProductsPageComponent,
    AdminHomeComponent,
    OrderItemComponent,
    OrderStatusFormComponent,
    ProductFormComponent,
    AddProductPageComponent,
    IngredientsFormComponent,
    IngredientsItemComponent,
    EditProductPageComponent,
    IngredientsPageComponent,
    IngredientAdminItemComponent,
    IngredientEditPageComponent,
    OpeningHoursPageComponent,
    OpeningHoursItemComponent,
    OpeningHoursEditComponent,
    DayOffsPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FullCalendarModule
  ],
  providers: [
    AuthGuard,
    DatePipe,
    MenuResolver,
    EditProductResolver,
    IngredientsPageResolver,
    EditIngredientResolver,
    OpeningHoursResolver,
    TimeConvertService
  ]
})
export class AdminModule { }
