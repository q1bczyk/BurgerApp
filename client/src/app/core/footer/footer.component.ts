import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ContactResponseInterface } from 'src/app/shared/models/contact-response.interface';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OpeningHourResponseInterface } from 'src/app/shared/models/opening-hour-response.interface';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  contact : ContactResponseInterface | null = null;
  openingHours : OpeningHourResponseInterface[] | null = null;

  constructor(private router : Router){}
  
  ngOnInit(): void 
  {
    const dataToParse = localStorage.getItem('activeLocal');
    if(dataToParse)
    {
      const data : LocalInterface = JSON.parse(dataToParse);
      this.contact = data.contact;
      this.openingHours = data.openingHours;
    }
  }

  getAddress() : string
  {
    if(this.contact)
      return `${this.contact.city}, ${this.contact.street} ${this.contact.streetNumber}`
    
    return '';
  }

}
