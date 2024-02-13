import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileComponent } from './components/mobile/mobile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  
  @ViewChild(MobileComponent) mobileComponent !: MobileComponent;

  constructor(private router : Router, private activatedRoute: ActivatedRoute){}

  openMenu() : void
  {
    this.mobileComponent.menuState(true);
  }

  navigate() : void
  {
    this.router.navigate(['menu'], { relativeTo: this.activatedRoute });
  }

}
