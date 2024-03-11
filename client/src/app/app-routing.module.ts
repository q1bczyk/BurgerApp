import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = 
[
  { 
    path : '', 
    component : UserComponent,
  },
  { 
    path: 'not-found', component: NotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }