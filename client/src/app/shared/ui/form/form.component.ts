import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  

  @Input() formGroup? : FormGroup;
  @Input() formSettings? : any;
  @Input() buttonLabel? : string;
  @Output() formEvent : EventEmitter<any> = new EventEmitter<any>;
  @Output() optionEvent : EventEmitter<string> = new EventEmitter<string>;

  onSubmit()
  {
    if(this.formGroup?.invalid)
      return
    
    this.formEvent.emit(this.formGroup?.value);
  }

  getFormControl(controlName: string): FormControl | null 
  {
    const control = this.formGroup?.get(controlName);
    return control instanceof FormControl ? control : null;
  }

  changeOption(value : string)
  {
    this.optionEvent.emit(value);
  }

  handleKeyPress(event: KeyboardEvent, fieldName: string) 
  {
    if(fieldName === 'phoneNumber') 
    {
      const inputChar = String.fromCharCode(event.charCode);
      if (!/^\d+$/.test(inputChar)) 
        event.preventDefault();
    }
  }


}