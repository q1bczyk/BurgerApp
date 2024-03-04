import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TimeFormaterService
{
    stringToTime(timeString : string) : FormatedTimeInterface
    {
        const [hour, minutes] = timeString.split(":");

        return {minutes : minutes, hour : hour}
    }
}

export interface FormatedTimeInterface
{
    minutes : string,
    hour : string,
}