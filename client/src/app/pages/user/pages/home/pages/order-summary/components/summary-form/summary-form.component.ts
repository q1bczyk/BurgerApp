import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ClientContactInterface, DeliveryDetailsInterface } from 'src/app/shared/models/client-contact.interface';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OrderProducts, OrderRequestInterface } from 'src/app/shared/models/order-request.interface';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { FormService } from 'src/app/shared/services/form.service';
import { OrderPossibilityService} from 'src/app/shared/services/order-possibility.service'
import { OrderService } from 'src/app/shared/services/order.service';
import { clearCart } from 'src/app/shared/store/cart-store/cart.action';
import { CartInterface } from 'src/app/shared/store/cart-store/cart.state';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';

@Component({
  selector: 'app-summary-form',
  templateUrl: './summary-form.component.html',
  styleUrls: ['./summary-form.component.scss']
})
export class SummaryFormComponent implements OnInit{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;
  @Input() isDelivery? : boolean;
  @Input() orderPrice? : number;
  @Input() products : any;

  contactForm : any;
  formSettings : any;
  localId : string = '';
  dynamicPath : string = '';

  constructor(private formService : FormService, private orderPossibilityService : OrderPossibilityService, private alertService : AlertService, private orderService : OrderService, private store : Store<{cartStorage : CartInterface}>, private router : Router){}

  ngOnInit(): void 
  {
    if(!this.isDelivery)
    {
      this.contactForm = this.formService.contactForm;
      this.formSettings = this.formService.clientContactFormSettings;
    }
    else
    {
      this.contactForm = this.formService.deliveryForm;
      this.formSettings = this.formService.deliveryFormSettings;
    }

    const dataToParse = localStorage.getItem('activeLocal');
    if(dataToParse)
    {
      const data : LocalInterface = JSON.parse(dataToParse);
      this.localId = data.id;
      this.dynamicPath = data.slug;
    }
  }

  onSubmitForm(value : any)
  {
    var orderStatus = this.orderPossibilityService.checkOrderPossibility();

    if(typeof orderStatus === 'string' && orderStatus !== 'completed')
    {
      this.alertService.ShowAlert('Nie można złożyć zamówienia', '', orderStatus, this.alertHost);
      return
    }

    const products : OrderProducts[] = []

    this.products.forEach((product : ProductInterface) => 
    {
      const orderProduct : OrderProducts = {productId : product.id, quantity : product.quantity}
      products.push(orderProduct);  
    });

    let deliveryDetails : DeliveryDetailsInterface | null = null;

    if(this.isDelivery)
    {
      deliveryDetails = 
      {
        city : value.city,
        postalCode : value.postalCode,
        street : value.street,
        houseNumber : value.houseNumber,
      }
    }

    const clientContact : ClientContactInterface = 
    {
      name : value.name,
      lastname : value.lastname,
      email : value.email,
      phoneNumber : value.phoneNumber,
      deliveryDetails : deliveryDetails,
    };

    if(!this.orderPrice)
      this.orderPrice = 0;
    
    const data : OrderRequestInterface =
    {
      price : this.orderPrice,
      isPaymentOnline : value.isPaymentOnline,
      products : products,
      clientsContact : clientContact,
      localId : this.localId,
    };

    this.orderService.placeOrder(data)
      .subscribe(data => {
        this.store.dispatch(clearCart())
        this.router.navigate([`${this.dynamicPath}/potwierdzenie/${data.id}`])
      }, err => {
        console.log(err);
      });
    
  }

  changePaymentMethod(value : string)
  {
    this.contactForm.get('isPaymentOnline')?.setValue(value);
  }

}
