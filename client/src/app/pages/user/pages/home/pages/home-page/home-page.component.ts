import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLocal } from 'src/app/pages/user/store/active-local.action';
import { LocalInterface } from 'src/app/shared/models/local.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(private route : ActivatedRoute, private store : Store<{localData : LocalInterface}>){}

  ngOnInit(): void {
    this.route.data
      .subscribe((data: any) => {
        const localData: LocalInterface | null = data.localData;
        if (localData) {
          this.store.dispatch(setLocal({ localData : localData }));
        }
      }, err => {
        console.log(err);
      });
  }

}
