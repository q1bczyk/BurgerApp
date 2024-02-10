import { Component, OnInit } from '@angular/core';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { LocalService } from './services/local.service';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  
  isLoading : boolean = true;
  locals : LocalInterface[] = [];
  error : string | null = null;

  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  constructor(private localService : LocalService, private router : Router){}
  
  ngOnInit(): void 
  {
    this.localService.FetchLocals()
      .subscribe(data => {
        this.isLoading = false;
        this.locals = data;
      }, err => {
        this.isLoading = false;
        this.error = err.message;
      });
  }

  getAddress(index : number) : string
  {
    return `${this.locals[index].contact.city}, ${this.locals[index].contact.street} ${this.locals[index].contact.streetNumber}`
  }

  onNavigate(index : number) : void
  {
    this.router.navigate(['/' + this.locals[index].slug]);
  }

}
