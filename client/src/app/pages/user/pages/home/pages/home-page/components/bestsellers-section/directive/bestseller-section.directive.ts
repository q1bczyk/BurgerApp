import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBestsellerDirective]'
})
export class BestsellerSectionDirective {

  @Input() appBestsellerDirective : number = 0;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) : void 
  {
    if(changes["appBestsellerDirective"] && changes["appBestsellerDirective"].currentValue !== changes["appBestsellerDirective"].previousValue) {
      this.changePage()
    }
  }

  changePage() : void
  {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(' + this.calcPosition() + 'px)');
  }

  private calcPosition() : number
  {
    return ((300 * -this.appBestsellerDirective + (this.appBestsellerDirective - 1) + this.appBestsellerDirective * 10) * 75 / 100)
  }

}
