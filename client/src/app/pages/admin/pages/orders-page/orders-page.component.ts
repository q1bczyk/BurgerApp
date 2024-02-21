import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{

  localId : string = '';

  constructor(private adminService : AdminService, private store : Store<{adminStorage : LocalInterface}>){}
  
  ngOnInit(): void 
  {
    this.store.select('adminStorage')
      .subscribe(data => {
        this.localId = data.id;
        console.log(this.localId)
      })
  }
  
}
