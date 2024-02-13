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
export class NotFoundComponent implements OnInit, OnDestroy{

  constructor(private router : Router, private store : Store<{activeLocalStore : LocalInterface}>){}

  dynamicPath :string = '';

  activeLocal$! : Observable<LocalInterface>
  activeLocalSubscription: Subscription | undefined;

  ngOnInit(): void 
  {
    this.activeLocal$ = this.store.select('activeLocalStore');
    this.activeLocalSubscription = this.activeLocal$
      .subscribe(data => {
        this.dynamicPath = `/${data.slug}`;
      })
  }

  ngOnDestroy(): void 
  {
    if(this.activeLocalSubscription)
      this.activeLocalSubscription.unsubscribe();
  }

  onNavigate() : void
  {
    this.router.navigate([this.dynamicPath]);
  }

}
