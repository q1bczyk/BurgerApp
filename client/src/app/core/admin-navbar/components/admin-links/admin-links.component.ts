import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router : Router, private activatedRoute : ActivatedRoute){}

  navigate(orderStatus: string): void 
  {
    this.router.navigate(['zamowienia'], { relativeTo: this.activatedRoute, queryParams: { 'order-status': orderStatus } });
  }

}
