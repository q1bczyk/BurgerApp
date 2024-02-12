import { Component } from '@angular/core';
import { faBurger, faDrumstickBite, faWineBottle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrls: ['./menu-section.component.scss']
})
export class MenuSectionComponent {

  faBurger = faBurger;
  faDrumstickBite = faDrumstickBite;
  faWineBottle = faWineBottle;

}
