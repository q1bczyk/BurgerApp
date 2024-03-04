import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = 
[
  { path: '', redirectTo: '/lokal', pathMatch: 'full' },
  { path: 'lokal', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { 
    path: 'not-found', component: NotFoundComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
