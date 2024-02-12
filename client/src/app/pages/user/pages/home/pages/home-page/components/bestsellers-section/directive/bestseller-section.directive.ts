import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBestsellerDirective]'
})
export class BestsellerSectionDirective implements OnInit{

  @Input() appBestsellerDirective : number = 0;
  @Output() maxPageEvent: EventEmitter<number> = new EventEmitter<number>();


  constructor(private el: ElementRef, private renderer: Renderer2) { }
 
  carouselWidth : number = 5 * 300 + 4 * 10;
  containerWidth : number = window.innerWidth * 80 / 100;
  carouselPosition : number = 0;
  maxCarouselPosition : number = this.carouselWidth - this.containerWidth + 3 * 35;

  ngOnInit(): void 
  {
    this.maxPageEvent.emit(Math.round(this.carouselWidth / this.containerWidth));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) : void 
  {
    this.containerWidth = window.innerWidth * 80 / 100;
    this.maxCarouselPosition = this.carouselWidth - this.containerWidth + 3 * 35;
    this.maxPageEvent.emit(Math.round(this.carouselWidth / this.containerWidth));
  }

  ngOnChanges(changes: SimpleChanges) : void 
  {
    if(changes["appBestsellerDirective"] && changes["appBestsellerDirective"].currentValue !== changes["appBestsellerDirective"].previousValue) {
      this.changePage()
    }
  }

  changePage() : void
  {
    this.calcPosition();
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(' + -this.carouselPosition + 'px)');
   
  }

  private calcPosition() : void
  {
    if(this.carouselPosition == 0 && this.appBestsellerDirective < 0)
      return

    this.carouselPosition = this.appBestsellerDirective * 310;

    if(this.carouselPosition > this.maxCarouselPosition)
      this.carouselPosition = this.maxCarouselPosition;    
  }

}
