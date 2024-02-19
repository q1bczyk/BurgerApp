import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsInterface } from 'src/app/shared/models/order-details.interface';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit
{
  @ViewChild('element') menuRef!: ElementRef;
  
  constructor(private route: ActivatedRoute){}
  
  orderDetails? : OrderDetailsInterface;

  ngOnInit(): void 
  {
    this.route.data
      .subscribe((data: any) => {
        this.orderDetails = data.orderDetails;
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
;
}
