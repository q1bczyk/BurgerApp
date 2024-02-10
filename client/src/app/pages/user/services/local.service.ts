import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService
{
  error = new Subject<string>;

  url : string = "https://localhost:5001/api/local"
  constructor(private http : HttpClient){}

  FetchLocals() : Observable<LocalInterface[]>
  {
    return this.http.get<LocalInterface[]>(this.url)
      .pipe(
        map(resData => {
          return resData;
        })
      );
  }

}
