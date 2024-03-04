import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { OpeningHourResponseInterface } from "src/app/shared/models/opening-hour-response.interface";
import { BaseApiService } from "src/app/shared/services/base-api.service";

@Injectable({
    providedIn : 'root'
})

export class OpeningHoursService extends BaseApiService
{
    url : string = this.baseUrl + 'openinghour'

    fetchOpeningHour(id : string) : Observable<OpeningHourResponseInterface>
    {
        return this.http.get<OpeningHourResponseInterface>(`${this.url}/${id}`, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    editOpeningHour(openingHour : OpeningHourResponseInterface) : Observable<OpeningHourResponseInterface>
    {
        return this.http.put<OpeningHourResponseInterface>(`${this.url}/${openingHour.id}`,openingHour, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }
}