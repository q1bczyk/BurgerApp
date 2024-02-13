import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-description-section',
  templateUrl: './description-section.component.html',
  styleUrls: ['./description-section.component.scss']
})
export class DescriptionSectionComponent {


  constructor(private router : Router, private activatedRoute: ActivatedRoute){}

  navigate() : void
  {
    this.router.navigate(['o-nas'], { relativeTo: this.activatedRoute });
  }

}
