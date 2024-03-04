import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { PlaceholderDirective } from '../alert/directive/placeholder.directive';
import { AlertService } from '../alert/service/alert.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent
{
  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;
  @ViewChild('menu') menuRef!: ElementRef;

  @Input() admin? : boolean

  faPlus = faPlus;

  productType : string = '';
  products : ProductInterface[] = [];
  isLoading : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productService : ProductService, private alertService : AlertService, private activatedRoute : ActivatedRoute) {}

  windowWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void 
  {
    if(!this.admin)
      this.windowWidth = (event.target as Window).innerWidth * 90 / 100;
    else if(this.admin && this.windowWidth > 992)
      this.windowWidth = this.windowWidth = ((event.target as Window).innerWidth - 300) * 90 / 100;
  }

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
    
    this.productService.getProducts(this.productType)
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

  deleteProduct(productId : string) : void
  {
    this.isLoading = true;
    this.productService.deleteProduct(productId)
      .subscribe(res  => {
        this.products = this.products.filter(product => product.id !== productId);
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.alertService.ShowAlert('Błąd', err.error, '', this.alertHost);
        this.isLoading = false;
      })
  }

  addProduct() : void
  {
    this.router.navigate(['dodaj'], { relativeTo : this.activatedRoute});
  }

}
