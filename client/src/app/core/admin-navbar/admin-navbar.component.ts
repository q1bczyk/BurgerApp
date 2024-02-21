import { Component, HostListener } from '@angular/core';
import { AdminService } from 'src/app/pages/admin/services/admin.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {

  constructor(private admisService : AdminService){}

  isMenuVisible : boolean = true;
  windowWidth?: number;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) 
  {
    this.windowWidth = window.innerWidth;
    if(this.windowWidth && this.windowWidth > 768)
      this.isMenuVisible = true;
  }

  showNavbar() : void
  {
    if(this.windowWidth && this.windowWidth > 768)
    {
      this.isMenuVisible = true;
      return
    }
    this.isMenuVisible = !this.isMenuVisible;    
  }

  logOut()
  {
    this.admisService.logOut();
  }

}
