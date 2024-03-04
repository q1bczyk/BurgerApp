import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from 'src/app/core/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { LinksComponent } from 'src/app/core/navbar/components/links/links.component';
import { MobileComponent } from 'src/app/core/navbar/components/mobile/mobile.component';
import { NavbarDirective } from 'src/app/core/navbar/directives/navbar.directive';
import { CartSummaryComponent } from 'src/app/core/cart-summary/cart-summary.component';
import { CartItemComponent } from 'src/app/core/cart-summary/cart-item/cart-item.component';
import { cartFeautureKey, cartReducer } from 'src/app/shared/store/cart-store/cart.reducer';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LinksComponent,
    MobileComponent,
    NavbarDirective,
    CartSummaryComponent,
    CartItemComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forFeature(cartFeautureKey, cartReducer)
  ]
})
export class UserModule { }
