import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { AdminService } from '../../services/admin.service';
import { setActiveAdmin } from '../../store/admin.action';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit
{

  localName : string = '';
  isLoading : boolean = true; 

  constructor(private adminService : AdminService, private store : Store<{adminStorage : LocalInterface}>){}

  ngOnInit(): void 
  {
    this.adminService.getLocalData()
      .subscribe(res => {
        this.localName = res.name
        this.isLoading = false;
        this.store.dispatch(setActiveAdmin({data : res}));
      }, err => {
        console.log(err),
        this.isLoading = false;
      })
  }
  
}
