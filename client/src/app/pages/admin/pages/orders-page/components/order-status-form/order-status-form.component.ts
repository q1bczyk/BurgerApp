import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-status-form',
  templateUrl: './order-status-form.component.html',
  styleUrls: ['./order-status-form.component.scss']
})
export class OrderStatusFormComponent 
{
  @Input() formSettings? : {orderId : string, orderStatus : string, isFormOpen : boolean}
  @Output() closeFormEvent : EventEmitter<void> = new EventEmitter<void>;
  @Output() dataEvent : EventEmitter<any> = new EventEmitter<any>;

  refusalReasonForm : FormGroup = this.fb.group(
  {
    refusalReason : ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(private datePipe : DatePipe, private fb : FormBuilder){}

  closeForm() : void
  {
    this.closeFormEvent.emit();
  }

  submitOrder(minutes : number) : void
  {
    const currentTime = new Date();
    const newTime = new Date(currentTime.getTime() + minutes * 60000);
    const convertedTime = this.datePipe.transform(newTime, 'HH:mm');
    
    this.dataEvent.emit({orderId : this.formSettings?.orderId, orderStatus : this.formSettings?.orderStatus, waitingTime : convertedTime})
  }

  onSubmit() : void
  {
    
    if(this.refusalReasonForm?.valid)
    {
      const refusalReasonValue = this.refusalReasonForm.get('refusalReason')?.value;
      this.dataEvent.emit({orderId : this.formSettings?.orderId, orderStatus : 'anulowane', refusalReason : refusalReasonValue});
    }
      
    return
  }

  stopPropagation(event: Event): void 
  {
    event.stopPropagation();
  }

}
