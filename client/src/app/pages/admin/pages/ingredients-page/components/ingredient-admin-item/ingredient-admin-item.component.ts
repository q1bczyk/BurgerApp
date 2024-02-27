import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faRemove, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IngredientInterface } from 'src/app/pages/admin/shared/models/ingredient.interface';

@Component({
  selector: 'app-ingredient-admin-item',
  templateUrl: './ingredient-admin-item.component.html',
  styleUrls: ['./ingredient-admin-item.component.scss']
})
export class IngredientAdminItemComponent 
{

  faRemove = faRemove;
  faEdit = faEdit;

  constructor(private router : Router, private activatedRoute : ActivatedRoute){}

  @Input() ingredient? : IngredientInterface;
  @Input() index? : number;
  @Output() deleteItemEvent : EventEmitter<string> = new EventEmitter<string>();

  onRemoveClick() : void
  {
    this.deleteItemEvent.emit(this.ingredient?.id);
  }

 onEditClick() : void
 {
  if(this.ingredient)
    this.router.navigate([`${this.ingredient.id}`], { relativeTo: this.activatedRoute});
 }

}
