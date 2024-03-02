import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderHubService } from 'src/app/shared/services/order-hub.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit
{

  localName : string = '';
  isLoading : boolean = true; 

  constructor(private adminService : AdminService, private title : Title)
  {
    const dataToParse = localStorage.getItem('activeAdminData');
    if(dataToParse)
    {
      const data = JSON.parse(dataToParse);
      this.title.setTitle(`${data.name} | Admin`);
    }
  }

  ngOnInit(): void 
  {
    this.adminService.getLocalData()
      .subscribe(res => {
        this.localName = res.name
        this.isLoading = false;
        localStorage.setItem('activeAdminData', JSON.stringify(res));
      }, err => {
        console.log(err),
        this.isLoading = false;
      })

  }
  
}
