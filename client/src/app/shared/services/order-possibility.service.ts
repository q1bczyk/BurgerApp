import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DayOffResponseInterface } from '../models/dayoff-response.interface';
import { LocalInterface } from '../models/local.interface';
import { OpeningHourResponseInterface } from '../models/opening-hour-response.interface';

@Injectable({
  providedIn: 'root'
})

export class OrderPossibilityService{

  openingHours : OpeningHourResponseInterface[] = [];
  dayOffs : DayOffResponseInterface[] = [];

  today : string;
  date : string;
 
  constructor(private store : Store<{activeLocalStore : LocalInterface}>)
  {
    const dataToParse = localStorage.getItem('activeLocal');
    if(dataToParse)
    {
      const data : LocalInterface = JSON.parse(dataToParse);
      this.dayOffs = data.dayOffs;
      this.openingHours = data.openingHours;
    }

      const formatedDate = this.formatDate();

      this.today = formatedDate.today;
      this.date = formatedDate.date;
  }

  checkOrderPossibility() : any
  {
    if(this.isDayOff() === true)
      return 'Dzisiaj mamy wolne'

    if(this.isToEarly() === true)
      return 'O tej godzinie lokal jest jeszcze zamknięty'

    if(this.isToLate() === true)
      return 'Jest już za pózno na złożenie zamówienia'

    return true;
    
  }

  private isDayOff() : boolean
  {
    const isDayOff = this.dayOffs.find(item => item.date === this.date)
    if(isDayOff)
      return true;

    const today : OpeningHourResponseInterface | undefined = this.openingHours.find(item => item.day === this.today)
    if(today?.isDayOff === true)
      return true;

    return false;
  }

  private isToEarly() : boolean
  {
    const today : OpeningHourResponseInterface | undefined = this.openingHours.find(item => item.day === this.today)

    const currentTime = new Date();

    if(today?.opened)
    {
      const openTime = this.formatTime(today?.opened);
      if(currentTime < openTime)
        return true;
    }
    
    return false
  }

  private isToLate() : boolean
  {
    const today : OpeningHourResponseInterface | undefined = this.openingHours.find(item => item.day === this.today)

    const currentTime = new Date();

    if(today?.closed)
    {
      const closeTime = this.formatTime(today?.closed);
      closeTime.setMinutes(closeTime.getMinutes() - 30);

      if(currentTime > closeTime)
        return true
    }
    
    return false
  }

  private formatDate() : any
  {
      const dateToFormat = new Date();
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('pl-PL', options);
      const dayFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('pl', { weekday: 'long' });

      const dataToReturn = 
      {
        today : dayFormatter.format(dateToFormat),
        date : dateFormatter.format(dateToFormat).replaceAll('.', '/')
      }

      return dataToReturn;
  }

  private formatTime(timeString : string) : Date
  {
    const[hours, minutes] = timeString.split(':').map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  }

}
