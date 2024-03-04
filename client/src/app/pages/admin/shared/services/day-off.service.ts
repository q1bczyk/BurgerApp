import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { DayOffResponseInterface } from "src/app/shared/models/dayoff-response.interface";
import { DeleteResponseInterface } from "src/app/shared/models/delete-response.interface";
import { BaseApiService } from "src/app/shared/services/base-api.service";

@Injectable({
    providedIn : 'root'
})

export class DayOffService extends BaseApiService
{
    url : string = this.baseUrl + 'dayoff'

    fetchDayOffs() : Observable<DayOffResponseInterface[]>
    {
        return this.http.get<DayOffResponseInterface[]>(this.url, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res
                })
            )
    }

    addDayOff(date : string) : Observable<DayOffResponseInterface>
    {
        return this.http.post<DayOffResponseInterface>(this.url, {date : date}, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res
                })
            )
    }

    deleteDayOff(dayOffId : string) : Observable<DeleteResponseInterface>
    {
        return this.http.delete<DeleteResponseInterface>(`${this.url}/${dayOffId}`, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    } 
}