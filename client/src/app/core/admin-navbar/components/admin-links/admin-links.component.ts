import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendar, faBell, faBurger, faEgg, faClock, faPhone, faRankingStar, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/pages/admin/services/admin.service';

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
  faSignOut = faSignOut

  constructor(private router : Router, private activatedRoute : ActivatedRoute, private admisService : AdminService){}

  navigate(queryParams: string, value: string, path: string): void 
  {
    const queryParamsObj = { [queryParams]: value };
    this.router.navigate([path], { relativeTo: this.activatedRoute, queryParams: queryParamsObj });
  }

  logOut()
  {
    this.admisService.logOut();
  }

}
