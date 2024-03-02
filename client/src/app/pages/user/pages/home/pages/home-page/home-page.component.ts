import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent
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
