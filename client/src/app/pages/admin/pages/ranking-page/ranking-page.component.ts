import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RankingProductInterface } from '../../shared/models/ranking-product.interface';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit
{

  ranking : RankingProductInterface[] = [];

  constructor(private route : ActivatedRoute){}
  
  ngOnInit(): void 
  {
    this.route.data
      .subscribe(data => {
        this.ranking = data['ranking']
      })
  }



}
