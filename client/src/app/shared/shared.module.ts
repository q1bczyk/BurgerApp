import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    LogoComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
