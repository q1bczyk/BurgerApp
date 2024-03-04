import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { IngredientsPipe } from 'src/app/shared/pipes/ingredients.pipe';
import { ProductService } from 'src/app/shared/services/product.service';
import { faCartShopping, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';

@Component({
  selector: 'app-bestsellers-section',
  templateUrl: './bestsellers-section.component.html',
  styleUrls: ['./bestsellers-section.component.scss']
})
export class BestsellersSectionComponent implements OnInit{
  
  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  faCartShopping = faCartShopping;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  bestsellers : ProductInterface[] = [];
  currentPage : number = 0;
  maxPage : number = 0;
  canScrollRightState : boolean = true;

  constructor(private productService : ProductService, private ingredientsPipe : IngredientsPipe, private alertService : AlertService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void 
  {
    this.productService.getBestsellers()
      .subscribe(res => {
        this.bestsellers = res;
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      })
  }

  changePage(value : number) : void
  {
    if(this.currentPage <= 0 && value < 0)
      return

    if(value > 0 && this.canScrollRightState === false)
      return

    this.currentPage += value;
  }

  setMaxPage(value : number) : void
  {
    this.maxPage = value;
  }

  showAlert(message : string) : void
  {
    this.alertService.ShowAlert('Nie można dodać produktu', '', message, this.alertHost);
  }

  canScrollRight(value: boolean): void 
  {
    console.log(value);
    setTimeout(() => {
      this.canScrollRightState = value;
      this.cdr.detectChanges(); // Ręczne sprawdzenie zmian
    });
  }
}

