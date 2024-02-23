import { Component } from '@angular/core';
import { faCalendar, faBell, faBurger, faEgg, faClock, faPhone, faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-links',
  templateUrl: './admin-links.component.html',
  styleUrls: ['./admin-links.component.scss']
})
export class AdminLinksComponent {

  faCalendar = faCalendar
  faBell  = faBell
  faBurger = faBurger
  faEgg = faEgg
  faClock = faClock
  faPhone = faPhone 
  faRankingStar = faRankingStar

}
