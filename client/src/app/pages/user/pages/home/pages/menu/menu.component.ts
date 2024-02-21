import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;
  @ViewChild('menu') menuRef!: ElementRef;

  productType : string = '';
  products : ProductInterface[] = [];
  isLoading : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productService : ProductService, private alertService : AlertService) {}

  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {
      this.productType = params['product-type'];
    });

    this.route.data
      .subscribe((data: any) => {
        this.products = data.products;
      }, err => {
        console.log(err);
      });
  }

  ngAfterViewInit(): void 
  {
    this.scrollToElement();
  }

  scrollToElement() 
  {
    this.menuRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  setType(type : string)
  {
    this.isLoading = true;
    this.productType = type;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 'product-type': type },
      queryParamsHandling: 'merge', 
    });
    
    this.productService.GetProducts(this.productType)
      .subscribe(data => {
        this.products = data;
        this.isLoading = false;
      }, err => 
      {
        this.isLoading = false;
        this.products = [];
      })

  }

  showAlert(message : string) : void
  {
    this.alertService.ShowAlert('Nie można dodać produktu', '', message, this.alertHost);
  }

}
