import { Directive, ElementRef, HostListener, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective implements OnInit{

  constructor(private el: ElementRef, private renderer: Renderer2){}
 
  ngOnInit(): void 
  {
    this.setDisplay();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) : void 
  {
    this.setDisplay();
  }

  private setDisplay() : void
  {
    const screenWidth = window.innerWidth;
    if(screenWidth >= 992)
        this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
      else
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

}
