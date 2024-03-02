import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent
{
  
  constructor(private title : Title)
  {
    const dataToParse = localStorage.getItem('activeLocal');
    if(dataToParse)
    {
      const data = JSON.parse(dataToParse);
      this.title.setTitle(`${data.name} | Strona Główna`);
    }
  }

}
