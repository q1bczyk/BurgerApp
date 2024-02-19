import { Component, Input, OnInit } from '@angular/core';
import { DeliveryDetailsInterface } from 'src/app/shared/models/client-contact.interface';
import { FormatedTimeInterface, TimeFormaterService } from 'src/app/shared/services/time-formater.service';

@Component({
  selector: 'app-order-in-progress',
  templateUrl: './order-in-progress.component.html',
  styleUrls: ['./order-in-progress.component.scss']
})
export class OrderInProgressComponent implements OnInit{

  @Input() waitingTime? : string;
  @Input() isDelivery? : DeliveryDetailsInterface;

  formatedTime? : FormatedTimeInterface;

  constructor(private timeFormaterService : TimeFormaterService)
  {}
  
  ngOnInit(): void 
  {
    if(this.waitingTime)
      this.formatedTime = this.timeFormaterService.stringToTime(this.waitingTime);
  }

}
