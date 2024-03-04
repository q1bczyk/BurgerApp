import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FormService } from 'src/app/shared/services/form.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { AdminContactInterface } from '../../shared/models/admin-contact.interface';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit
{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  formSettings : any = this.formService.adminContactFormSettings;
  form : FormGroup = this.formService.adminContactForm;
  isLoading : boolean = true;

  constructor(private alertService : AlertService, private adminService : AdminService, private formService : FormService, private title : Title)
  {
    const dataToParse = localStorage.getItem('activeAdminData');
    if(dataToParse)
    {
      const data = JSON.parse(dataToParse);
      this.title.setTitle(`${data.name} | Kontakt`);
    }
  }
  
  ngOnInit(): void 
  {
    this.adminService.getAdminContact()
      .subscribe(data => {
        this.setForm(data);
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  onSubmit(value : AdminContactInterface) : void
  {
    this.isLoading = true;
    this.adminService.editData(value)
      .subscribe(data => {
        this.isLoading = false;
        this.alertService.ShowAlert('Sukces', 'pomyslnie edytowano dane', '', this.alertHost)
        this.setForm(data)
      }, err => {
        console.log(err)
        this.isLoading = false;
        this.alertService.ShowAlert('Błąd', err.error, '', this.alertHost)
      })
  }

  private setForm(data : AdminContactInterface) : void
  {
    this.form.setValue({
      city : data.city,
      postalCode : data.postalCode,
      street : data.street,
      streetNumber : data.streetNumber,
      email : data.email,
      phoneNumber : data.phoneNumber,
    });
  }

}
