import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OpeningHourResponseInterface } from 'src/app/shared/models/opening-hour-response.interface';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { __values } from 'tslib';
import { OpeningHoursService } from '../../shared/services/openingHours.service';
import { TimeConvertService } from './services/time-convert.service';

@Component({
  selector: 'app-opening-hours-edit',
  templateUrl: './opening-hours-edit.component.html',
  styleUrls: ['./opening-hours-edit.component.scss']
})
export class OpeningHoursEditComponent implements OnInit 
{
  
  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  openingHour? : OpeningHourResponseInterface;
  isLoading? : boolean;
  
  formGroup : FormGroup = this.fb.group(
  {
    openedHour : ['', [Validators.required, Validators.maxLength(2)]],
    openedMinutes : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    closedHour : ['', [Validators.required, Validators.maxLength(2)]],
    closedMinutes : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    isDayOff : [],
  })
 
  constructor(private route : ActivatedRoute, private fb : FormBuilder, private timeConvertSerivce : TimeConvertService, private alertService : AlertService, private openingHoursService : OpeningHoursService, private title : Title)
  {
    const dataToParse = localStorage.getItem('activeAdminData');
    if(dataToParse)
    {
      const data = JSON.parse(dataToParse);
      this.title.setTitle(`${data.name} | Edytuj Godziny Otwarcia`);
    }
  }

  ngOnInit(): void
  {
    this.route.data
      .subscribe(data => {
        this.openingHour = data['openingHour']
      })

      if(!this.openingHour)
        return

      const openHour = this.timeConvertSerivce.divideTime(this.openingHour.opened);
      const closedHour = this.timeConvertSerivce.divideTime(this.openingHour.closed);

      this.formGroup.setValue({
        openedHour : openHour.hour,
        openedMinutes : openHour.minutes,
        closedHour : closedHour.hour,
        closedMinutes : closedHour.minutes,
        isDayOff : this.openingHour.isDayOff.toString(),
      })

  }

  onSubmit() : void
  {
    if(!this.openingHour)
      return

    const value = this.formGroup.value;

    const openedHour = this.timeConvertSerivce.timeToString({hour : value.openedHour, minutes : value.openedMinutes})
    const closedHour = this.timeConvertSerivce.timeToString({hour : value.closedHour, minutes : value.closedMinutes})
  
    let isDayOff : boolean = false;

    if(this.formGroup.get('isDayOff')?.value === 'true')
      isDayOff = true;

    const editedOpeningHours : OpeningHourResponseInterface = 
    {
      id : this.openingHour.id,
      day : this.openingHour.day,
      opened : openedHour,
      closed : closedHour,
      isDayOff : isDayOff,
    }

    this.isLoading = true;
    this.openingHoursService.editOpeningHour(editedOpeningHours)
      .subscribe(res => {
        this.isLoading = false;
        this.alertService.ShowAlert('Sukces', 'pomyślnie zmieniono godziny otwarcia', '', this.alertHost);
      }, err => {
        console.log(err)
        this.isLoading = false;
        this.alertService.ShowAlert('Błąd', err.message, '', this.alertHost);
      })

  }

 onHourChange(fieldName : string) : void
 {
  if(!this.formGroup)
      return
    
      const formControl = this.formGroup.get(fieldName);
      const fieldValue : number = formControl?.value

      if(fieldValue > 24)
        this.formGroup.get(fieldName)?.setValue('24');

        if(fieldValue.toString() === '')
          this.formGroup.get(fieldName)?.setValue('0');
 }

  onMinutesChange(minutesField : string, hourField : string) : void
  {
    if(!this.formGroup)
      return
    
      const minutesFormControl = this.formGroup.get(minutesField);
      const minutesValue : string = minutesFormControl?.value

      const hoursFormControl = this.formGroup.get(hourField);
      const hourValue : number = hoursFormControl?.value

      if(parseInt(minutesValue) > 59)
        this.formGroup.get(minutesField)?.setValue('59');

      if(minutesValue.length === 1)
        this.formGroup.get(minutesField)?.setValue('0' + minutesValue);

      if(hourValue >= 24 && parseInt(minutesValue) > 0)
        this.formGroup.get(hourField)?.setValue('0');

      if(minutesValue === '')
        this.formGroup.get(minutesField)?.setValue('00');
  }

  handleKeyPress(event: KeyboardEvent, fieldName : string) 
  {
    if(!this.formGroup)
      return
    
      const formControl = this.formGroup.get(fieldName);
      const fieldValue : string = formControl?.value

      const inputChar = String.fromCharCode(event.charCode);
      if (!/^\d+$/.test(inputChar) || fieldValue.length > 1 || parseInt(fieldValue) > 59) 
        event.preventDefault();
  }

}
