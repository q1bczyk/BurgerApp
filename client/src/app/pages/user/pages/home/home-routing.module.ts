import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { MenuResolver } from '../../../../shared/ui/menu/menu.resolver';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderResolver } from './pages/order-page/order-page.resolver';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { MenuGuard } from 'src/app/shared/ui/menu/menu.guard';

const routes: Routes = 
[
  {
    path: ':slug',
    component: HomeComponent,
    resolve : {localData : HomeResolver},
    children: 
    [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'menu',
        component: MenuPageComponent,
        canActivate : [MenuGuard], 
        resolve : {products : MenuResolver},
      },
      {
        path: 'o-nas',
        component: AboutUsComponent,
      },
      {
        path: 'zamowienie',
        component: OrderSummaryComponent,
      },
      {
        path: 'potwierdzenie/:orderId',
        component: OrderPageComponent,
        resolve : {orderDetails : OrderResolver}
      }
    ],
  },
  { 
    path: '**', component: NotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
