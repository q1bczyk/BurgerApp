import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuResolver } from './pages/menu/menu.resolver';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';

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
        component: MenuComponent,
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
