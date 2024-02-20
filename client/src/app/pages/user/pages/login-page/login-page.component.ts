import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  loginForm : any;
  loginFormSettings : any;
  isLoading : boolean = false;

  constructor(private formService : FormService, private adminService : AdminService, private router : Router, private alertService : AlertService)
  {
    this.loginForm = formService.loginForm;
    this.loginFormSettings = formService.loginFormSettings;
  }

  onSubmit(data : any)
  {
    this.isLoading = true;
    this.adminService.login(data)
      .subscribe(res => {
        this.isLoading = false;
        localStorage.setItem('token', res.token)
        this.router.navigate(['/admin']);
      }, err => {
        let errorTitle : string = '';
        let errorDetails : string = '';

        if(err.status === 401)
        {
          errorTitle = 'Błędne dane';
          errorDetails = 'Podany email lub hasło jest niepoprawne';
        }  
          
        else
        {
          errorTitle = 'Błąd';
          errorDetails = err.message;
        } 

        this.isLoading = false;
        this.alertService.ShowAlert(errorTitle, '', errorDetails, this.alertHost);
      })
  }

}
