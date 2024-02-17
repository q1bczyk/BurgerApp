import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeResolver } from './home.resolver';
import { MenuSectionComponent } from './pages/home-page/components/menu-section/menu-section.component';
import { DescriptionSectionComponent } from './pages/home-page/components/description-section/description-section.component';
import { BestsellersSectionComponent } from './pages/home-page/components/bestsellers-section/bestsellers-section.component';
import { IngredientsPipe } from 'src/app/shared/pipes/ingredients.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BestsellerSectionDirective } from './pages/home-page/components/bestsellers-section/directive/bestseller-section.directive';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HistorySectionComponent } from './pages/about-us/components/history-section/history-section.component';
import { IngredientsSectionComponent } from './pages/about-us/components/ingredients-section/ingredients-section.component';
import { IntroSectionComponent } from './pages/about-us/components/intro-section/intro-section.component';
import { MenuResolver } from './pages/menu/menu.resolver';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { SummaryItemComponent } from './pages/order-summary/components/summary-item/summary-item.component';
import { SummaryFormComponent } from './pages/order-summary/components/summary-form/summary-form.component';

@NgModule({
  declarations: [
    HomePageComponent,
    MenuSectionComponent,
    DescriptionSectionComponent,
    BestsellersSectionComponent,
    BestsellerSectionDirective,
    AboutUsComponent,
    MenuComponent,
    HistorySectionComponent,
    IngredientsSectionComponent,
    IntroSectionComponent,
    OrderSummaryComponent,
    SummaryItemComponent,
    SummaryFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    HomeResolver,
    MenuResolver,
    IngredientsPipe,
  ]
})
export class HomeModule { }
