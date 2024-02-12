import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ContactResponseInterface } from 'src/app/shared/models/contact-response.interface';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OpeningHourResponseInterface } from 'src/app/shared/models/opening-hour-response.interface';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy{

  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  activeLocal$! : Observable<LocalInterface>
  activeLocalSubscription: Subscription | undefined;

  contact : ContactResponseInterface | null = null;
  openingHours : OpeningHourResponseInterface[] | null = null;

  constructor(private store : Store<{activeLocalStore : LocalInterface}>){}
  
  ngOnInit(): void 
  {
    this.activeLocal$ = this.store.select('activeLocalStore');
    this.activeLocalSubscription = this.activeLocal$
      .subscribe(data => {
        this.contact = data.contact;
        this.openingHours = data.openingHours;

      })
  }

  getAddress() : string
  {
    if(this.contact)
      return `${this.contact.city}, ${this.contact.street} ${this.contact.streetNumber}`
    
    return '';
  }

  ngOnDestroy(): void 
  {
    if(this.activeLocalSubscription)
      this.activeLocalSubscription.unsubscribe();
  }

}
