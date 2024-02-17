import { Component, Input, OnInit} from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-summary-form',
  templateUrl: './summary-form.component.html',
  styleUrls: ['./summary-form.component.scss']
})
export class SummaryFormComponent implements OnInit{

  @Input() isDelivery? : boolean;

  contactForm : any;
  formSettings : any;

  constructor(private formService : FormService){}

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
    console.log(value);
  }

  changePaymentMethod(value : string)
  {
    this.contactForm.get('isPaymentOnline')?.setValue(value);
  }

}
