import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientInterface } from '../../shared/models/ingredient.interface';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss']
})
export class IngredientsPageComponent implements OnInit
{
  
  ingredients : IngredientInterface[] = [];

  constructor(private route : ActivatedRoute){}

  ngOnInit(): void 
  {
    this.route.data
      .subscribe(data => {
        this.ingredients = data['ingredients']
      }, err => {
        console.log(err)
      })
  }

}
