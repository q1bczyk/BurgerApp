import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { LocalInterface } from 'src/app/shared/models/local.interface';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy{

  dynamicPath :string = '';

  activeLocal$! : Observable<LocalInterface>
  activeLocalSubscription: Subscription | undefined;

  constructor(private store : Store<{activeLocalStore : LocalInterface}>, private router : Router, private activatedRoute : ActivatedRoute){}

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

  navigate(productType: string): void 
  {
    this.router.navigate(['menu'], { relativeTo: this.activatedRoute, queryParams: { 'product-type': productType } });
  }

}
