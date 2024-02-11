import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeResolver } from './home.resolver';
import { MenuSectionComponent } from './pages/home-page/components/menu-section/menu-section.component';
import { DescriptionSectionComponent } from './pages/home-page/components/description-section/description-section.component';
import { BestsellersSectionComponent } from './pages/home-page/components/bestsellers-section/bestsellers-section.component';

@NgModule({
  declarations: [
    HomePageComponent,
    MenuSectionComponent,
    DescriptionSectionComponent,
    BestsellersSectionComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [
    HomeResolver
  ]
})
export class HomeModule { }
