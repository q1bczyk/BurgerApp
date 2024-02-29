import { Injectable } from '@angular/core';
import { LocalInterface } from 'src/app/shared/models/local.interface';
import { map, Observable, Subject } from 'rxjs';
import { BaseApiService } from 'src/app/shared/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends BaseApiService
{
  error = new Subject<string>;

  url : string = this.baseUrl + "local"
 
  fetchLocals() : Observable<LocalInterface[]>
  {
    return this.http.get<LocalInterface[]>(this.url)
      .pipe(
        map(resData => {
          return resData;
        })
      );
  }

  fetchLocal(slug : string) : Observable<LocalInterface>
  {
    return this.http.get<LocalInterface>(this.url + `/${slug}`)
      .pipe(
        map(resData => {
          return resData;
        })
      )
  }

}
