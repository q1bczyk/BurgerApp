import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserComponent } from './user.component';

const routes: Routes = 
[
  {
    path: '',
    component: UserComponent, 
  },
  {
    path: 'logowanie',
    component: LoginPageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
