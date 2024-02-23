import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './pages/user/user.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeModule } from './pages/user/pages/home/home.module';
import { StoreModule } from '@ngrx/store';
import { AdminNavbarComponent } from './core/admin-navbar/admin-navbar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminModule } from './pages/admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { AdminLinksComponent } from './core/admin-navbar/components/admin-links/admin-links.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    AdminComponent,
    AdminLinksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HomeModule,
    AdminModule,
    SharedModule,
    FontAwesomeModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
