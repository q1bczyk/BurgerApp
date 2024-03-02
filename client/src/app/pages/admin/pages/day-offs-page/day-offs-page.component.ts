import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AlertService } from 'src/app/shared/ui/alert/service/alert.service';
import { PlaceholderDirective } from 'src/app/shared/ui/alert/directive/placeholder.directive';
import { DayOffService } from '../../shared/services/day-off.service';
import { DayOffResponseInterface } from 'src/app/shared/models/dayoff-response.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-day-offs-page',
  templateUrl: './day-offs-page.component.html',
  styleUrls: ['./day-offs-page.component.scss']
})
export class DayOffsPageComponent implements OnInit 
{

  @ViewChild(PlaceholderDirective, { static: true }) alertHost!: PlaceholderDirective;

  calendarOptions? : CalendarOptions;
  dayOffs : DayOffResponseInterface[] = [];
  events : {title : string, date : string, display : string}[] = [];

  constructor(private alertService : AlertService, private dayOffService : DayOffService, private title : Title)
  {
    const dataToParse = localStorage.getItem('activeAdminData');
    if(dataToParse)
    {
      const data = JSON.parse(dataToParse);
      this.title.setTitle(`${data.name} | Dni Wolne`);
    }
  }
  
  ngOnInit(): void 
  {
    this.dayOffService.fetchDayOffs()
      .subscribe(data => {
        this.dayOffs = data;
        this.initializeCalendar();
      })
  }
  
  private handleDateClick(date : any) : void
  {
    const today = new Date();

    if(date.date <= today)
    {
      this.alertService.ShowAlert('Błąd', 'podana data jest datą przeszłą bądź teraźniejszą', '', this.alertHost)
      return
    }

    if(this.isDateExists(date.dateStr))
    {
      this.dayOffService.deleteDayOff(this.findId(date.dateStr))
        .subscribe(res => {
          location.reload();
        }, err => {
          this.alertService.ShowAlert('Błąd', err.error, '', this.alertHost);
          console.log(err)
        });
        
      return;
    }
      
    let convertedDate = date.date.toLocaleDateString("pl-PL").replace(/\./g, '/');
    
    if(convertedDate.length === 9)
      convertedDate = '0' + convertedDate;

    this.dayOffService.addDayOff(convertedDate)
      .subscribe(res => {
        location.reload();
      }, err => {
        console.log(err);
        this.alertService.ShowAlert('Błąd', err.error, '', this.alertHost);
      });
  }

  private initializeCalendar()
  {
    this.dayOffs.forEach(element => {
        this.events.push({title : 'dzień wolny', date : this.dateToCalendarConventer(element.date), display : 'background'})
    });

    this.calendarOptions = 
    {
      initialView : 'dayGridMonth',
      plugins : [dayGridPlugin, interactionPlugin],
      firstDay : 1,
      dateClick: (arg) => this.handleDateClick(arg),
      events : this.events,
      locale: 'pl',
    }
  }

  private dateToCalendarConventer(date : string) : string
  {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  private isDateExists(date : string) : boolean
  {
    let isDateExists = false;

    this.events.forEach(element => {
        if(element.date === date)
          isDateExists = true;
    });

    return isDateExists;
  }

  private findId(date : string) : string
  {
    const index = this.events.findIndex(element => element.date === date);
    return this.dayOffs[index].id;
  }

}
