import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent 
{

  formSettings : any = this.formService.adminContactFormSettings;
  form : FormGroup = this.formSettings.adminContactForm;

  constructor(private alertService : AlertService, private adminService : AdminService, private formService : FormService){}

}
