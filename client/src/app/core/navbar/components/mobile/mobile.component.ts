import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent {

  faRemove = faRemove;

  isMenuActive : boolean = false;

  menuState(value : boolean)
  {
    this.isMenuActive = value;
  }

}
