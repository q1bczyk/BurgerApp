import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { OpeningHourResponseInterface } from 'src/app/shared/models/opening-hour-response.interface';

@Component({
  selector: 'app-opening-hours-page',
  templateUrl: './opening-hours-page.component.html',
  styleUrls: ['./opening-hours-page.component.scss']
})
export class OpeningHoursPageComponent implements OnInit 
{

  openingHours : OpeningHourResponseInterface[] = [];

  constructor(private title : Title){}

  ngOnInit(): void 
  {
    const dataToParse = localStorage.getItem('activeAdminData');
    if(dataToParse)
    {
      const data : LocalInterface = JSON.parse(dataToParse)
      this.openingHours = data.openingHours;
      this.title.setTitle(`${data.name} | Godziny Otwarcia`);
    }
  }
  
 

}
