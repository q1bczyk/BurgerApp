import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-bestsellers-section',
  templateUrl: './bestsellers-section.component.html',
  styleUrls: ['./bestsellers-section.component.scss']
})
export class BestsellersSectionComponent implements OnInit{
  
  bestsellers : ProductInterface[] = []

  constructor(private productService : ProductService){}

  ngOnInit(): void 
  {
    this.productService.GetBestsellers()
      .subscribe(res => {
        this.bestsellers = res;
      }, err => {
        console.log(err);
      })
  }

}
