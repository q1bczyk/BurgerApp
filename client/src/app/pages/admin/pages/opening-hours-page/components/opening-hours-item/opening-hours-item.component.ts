import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpeningHourResponseInterface } from 'src/app/shared/models/opening-hour-response.interface';

@Component({
  selector: 'app-opening-hours-item',
  templateUrl: './opening-hours-item.component.html',
  styleUrls: ['./opening-hours-item.component.scss']
})
export class OpeningHoursItemComponent 
{
  @Input() openingHour? : OpeningHourResponseInterface;

  constructor(private router : Router, private activatedRoute : ActivatedRoute){}

  navigate()
  {
    console.log(this.openingHour?.id)
    this.router.navigate([`${this.openingHour?.id}`], { relativeTo: this.activatedRoute});
  }
}
