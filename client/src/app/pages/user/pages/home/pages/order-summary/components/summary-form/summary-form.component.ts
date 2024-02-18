import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';
import { OrderPossibilityService} from 'src/app/shared/services/order-possibility.service'
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

  contactForm : any;
  formSettings : any;

  constructor(private formService : FormService, private orderPossibilityService : OrderPossibilityService, private alertService : AlertService){}

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
  }

  onSubmitForm(value : any)
  {
    var orderStatus = this.orderPossibilityService.checkOrderPossibility();

    if(typeof orderStatus === 'string' && orderStatus !== 'completed')
    {
      this.alertService.ShowAlert('Nie można złożyć zamówienia', '', orderStatus, this.alertHost);
      return
    }
    console.log(value);
  }

  changePaymentMethod(value : string)
  {
    this.contactForm.get('isPaymentOnline')?.setValue(value);
  }

}
