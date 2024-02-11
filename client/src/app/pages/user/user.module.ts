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
import { activeLocalFeautureKey, activeLocalReducer } from './store/active-local.reducer';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forFeature(activeLocalFeautureKey, activeLocalReducer),
  ]
})
export class UserModule { }
