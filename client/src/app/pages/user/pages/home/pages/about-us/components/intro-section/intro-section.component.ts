import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.scss']
})
export class IntroSectionComponent implements AfterViewInit{
  
  @ViewChild('intro') intro!: ElementRef;

  scrollToElement() {
    this.intro.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit(): void 
  {
    this.scrollToElement();
  }

}
