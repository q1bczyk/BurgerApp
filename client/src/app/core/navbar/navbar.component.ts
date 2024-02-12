import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LocalInterface } from 'src/app/shared/models/local.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  
  activeLocal$! : Observable<LocalInterface>
  activeLocalSubscription: Subscription | undefined;

  dynamicPath : string = '';

  constructor(private store : Store<{activeLocalStore : LocalInterface}>){}

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

}
