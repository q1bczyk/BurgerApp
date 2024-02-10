import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = 
[
  {
    path: ':slug',
    component: HomeComponent,
    resolve : {local : HomeResolver},
    children: 
    [
      {
        path: '',
        component: HomePageComponent,
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
