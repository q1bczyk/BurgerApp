import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MobileComponent } from './components/mobile/mobile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  
  @ViewChild(MobileComponent) mobileComponent !: MobileComponent;

  openMenu() : void
  {
    this.mobileComponent.menuState(true);
  }

}
