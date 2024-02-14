import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router : Router, private activatedRoute : ActivatedRoute){}

  navigate(type : string) : void
  {
    this.router.navigate(['menu'], { relativeTo: this.activatedRoute, queryParams: { 'product-type': type } });
  }


}
