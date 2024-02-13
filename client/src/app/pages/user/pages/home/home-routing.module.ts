import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuComponent } from './pages/menu/menu.component';

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
      },
      {
        path: 'o-nas',
        component: AboutUsComponent,
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
