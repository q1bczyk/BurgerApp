import { Component, HostListener, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { IngredientsPipe } from 'src/app/shared/pipes/ingredients.pipe';
import { ProductService } from 'src/app/shared/services/product.service';
import { faCartShopping, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bestsellers-section',
  templateUrl: './bestsellers-section.component.html',
  styleUrls: ['./bestsellers-section.component.scss']
})
export class BestsellersSectionComponent implements OnInit{
  
  faCartShopping = faCartShopping;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  bestsellers : ProductInterface[] = []

  constructor(private productService : ProductService, private ingredientsPipe : IngredientsPipe){}

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
