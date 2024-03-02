import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalInterface } from 'src/app/shared/models/local.interface';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit{

  @Output() linkClickedEvent : EventEmitter<void> = new EventEmitter<void>();

  dynamicPath :string = '';

  constructor(private store : Store<{activeLocalStore : LocalInterface}>, private router : Router, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void 
  {
    const dataToParse = localStorage.getItem('activeLocal');
    if(dataToParse)
    {
      const data : LocalInterface = JSON.parse(dataToParse);
      this.dynamicPath = `/${data.slug}`;
    }
  }

  navigate(productType: string): void 
  {
    this.router.navigate(['menu'], { relativeTo: this.activatedRoute, queryParams: { 'product-type': productType } });
  }

  scrollToBottom() : void
  {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    this.onLinkClicked();
  }

  onLinkClicked() : void
  {
    this.linkClickedEvent.emit();
  }

}
