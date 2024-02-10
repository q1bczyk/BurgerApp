import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(private route : ActivatedRoute, private componentFactoryResolver : ComponentFactoryResolver){}

  ngOnInit(): void 
  {
    this.route.data
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
  }

}
