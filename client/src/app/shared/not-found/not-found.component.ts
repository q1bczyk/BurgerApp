import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LocalInterface } from '../models/local.interface';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit{

  dynamicPath : string = '';

  constructor(private router : Router){}

    ngOnInit(): void 
  {
    const dataToParse = localStorage.getItem('activeLocal');
    if(dataToParse)
    {
      const data : LocalInterface = JSON.parse(dataToParse);
      this.dynamicPath = `/${data.slug}`;
    }
  }

  onNavigate() : void
  {
    this.router.navigate([this.dynamicPath]);
  }

}
