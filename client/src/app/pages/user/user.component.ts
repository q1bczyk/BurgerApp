import { Component, OnInit } from '@angular/core';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { LocalService } from './services/local.service';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  
  locals : LocalInterface[] = [];

  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  constructor(private localService : LocalService){}
  
  ngOnInit(): void 
  {
    this.localService.FetchLocals()
      .subscribe(data => {
        this.locals = data;
      }, err => {
        console.log(err)
      });
  };

  getAddress(index : number) : string
  {
    return `${this.locals[index].contact.city}, ${this.locals[index].contact.street} ${this.locals[index].contact.streetNumber}`
  }

}
